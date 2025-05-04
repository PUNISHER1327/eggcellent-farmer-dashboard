
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { FileDown, FileText, Calendar, Clock } from 'lucide-react';

const ReportsTab: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const cardClass = theme === 'light' 
    ? 'glass-morphism p-4 bg-white border border-gray-200 shadow-sm'
    : 'glass-morphism p-4 bg-gray-800 border border-gray-700';

  const reports = [
    { id: 1, name: 'April 2025 Performance Report', date: '2025-05-01', type: 'Monthly' },
    { id: 2, name: 'March 2025 Performance Report', date: '2025-04-01', type: 'Monthly' },
    { id: 3, name: 'February 2025 Performance Report', date: '2025-03-01', type: 'Monthly' },
    { id: 4, name: 'Q1 2025 Analysis', date: '2025-04-15', type: 'Quarterly' },
  ];

  const scheduledReports = [
    { id: 1, name: 'Weekly Performance', frequency: 'Every Monday', next: '2025-05-11' },
    { id: 2, name: 'Monthly Summary', frequency: 'First of Month', next: '2025-06-01' },
    { id: 3, name: 'Environmental Conditions', frequency: 'Daily', next: '2025-05-05' },
  ];

  return (
    <div className="space-y-8">
      <Card className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            {t('monthlyReports')}
          </h3>
          <Button 
            variant="outline"
            className={`flex items-center gap-2 ${
              theme === 'light' 
                ? 'bg-white hover:bg-gray-50 text-gray-800' 
                : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700'
            }`}
          >
            <FileDown className="h-4 w-4" />
            {t('exportData')}
          </Button>
        </div>
        <div className={`overflow-hidden rounded-lg border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-farm-green" />
                      {report.name}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {report.date}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button size="sm" variant="ghost" className="text-farm-green">{t('view')}</Button>
                    <Button size="sm" variant="ghost" className="text-farm-blue">{t('download')}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('scheduledReports')}
        </h3>
        <div className={`overflow-hidden rounded-lg border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('frequency')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('nextRun')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              {scheduledReports.map((report) => (
                <tr key={report.id}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-farm-yellow" />
                      {report.name}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {report.frequency}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {report.next}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button size="sm" variant="ghost" className="text-farm-green">{t('edit')}</Button>
                    <Button size="sm" variant="ghost" className="text-red-500">{t('delete')}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            className={`flex items-center gap-2 ${
              theme === 'light' 
                ? 'bg-farm-green hover:bg-farm-green/90 text-white' 
                : 'bg-farm-green hover:bg-farm-green/90 text-white'
            }`}
          >
            <Calendar className="h-4 w-4" />
            {t('createNewScheduledReport')}
          </Button>
        </div>
      </Card>

      <Card className={cardClass}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {t('customReports')}
        </h3>
        <div className="p-6 text-center border border-dashed rounded-lg border-gray-300 dark:border-gray-600">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className={`mt-2 text-sm font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{t('createCustomReport')}</h3>
          <p className={`mt-1 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {t('customReportDescription')}
          </p>
          <Button 
            className="mt-3"
            variant="outline" 
          >
            {t('createCustomReport')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportsTab;
