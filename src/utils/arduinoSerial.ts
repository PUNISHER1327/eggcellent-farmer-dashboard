// Arduino Serial Communication using WebSerial API

// Type definitions for Web Serial API
interface SerialPort {
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
}

interface NavigatorWithSerial {
  serial: {
    requestPort(): Promise<SerialPort>;
    getPorts(): Promise<SerialPort[]>;
  };
}

export class ArduinoSerial {
  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader | null = null;
  private writer: WritableStreamDefaultWriter | null = null;
  private isConnected = false;

  async connect(): Promise<boolean> {
    try {
      // Request a port and open a connection
      const nav = navigator as unknown as NavigatorWithSerial;
      this.port = await nav.serial.requestPort();
      await this.port.open({ baudRate: 9600 });
      
      // Set up reader and writer
      if (this.port.readable) {
        this.reader = this.port.readable.getReader();
      }
      if (this.port.writable) {
        this.writer = this.port.writable.getWriter();
      }
      
      this.isConnected = true;
      console.log('Arduino connected successfully');
      return true;
    } catch (error) {
      console.error('Error connecting to Arduino:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.reader) {
        await this.reader.cancel();
        this.reader.releaseLock();
        this.reader = null;
      }
      
      if (this.writer) {
        this.writer.releaseLock();
        this.writer = null;
      }
      
      if (this.port) {
        await this.port.close();
        this.port = null;
      }
      
      this.isConnected = false;
      console.log('Arduino disconnected');
    } catch (error) {
      console.error('Error disconnecting from Arduino:', error);
    }
  }

  async sendCommand(command: 'ON' | 'OFF'): Promise<boolean> {
    if (!this.writer || !this.isConnected) {
      console.error('Arduino not connected');
      return false;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(command + '\n');
      await this.writer.write(data);
      console.log(`Command sent to Arduino: ${command}`);
      return true;
    } catch (error) {
      console.error('Error sending command to Arduino:', error);
      return false;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async readData(): Promise<string | null> {
    if (!this.reader || !this.isConnected) {
      return null;
    }

    try {
      const { value, done } = await this.reader.read();
      if (done) {
        return null;
      }
      
      const decoder = new TextDecoder();
      return decoder.decode(value);
    } catch (error) {
      console.error('Error reading from Arduino:', error);
      return null;
    }
  }
}

// Singleton instance
let arduinoInstance: ArduinoSerial | null = null;

export const getArduinoInstance = (): ArduinoSerial => {
  if (!arduinoInstance) {
    arduinoInstance = new ArduinoSerial();
  }
  return arduinoInstance;
};

// Check if WebSerial API is supported
export const isWebSerialSupported = (): boolean => {
  return 'serial' in navigator;
};
