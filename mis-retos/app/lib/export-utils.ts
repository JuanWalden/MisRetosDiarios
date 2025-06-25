
import { getAllStorageData, getStatistics } from './storage-utils';
import { formatDateForDisplay, formatDateShort } from './date-utils';

export async function exportToPDF(): Promise<void> {
  try {
    // Crear una nueva ventana para el contenido del PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('No se pudo abrir ventana para imprimir');
    }

    // Obtener datos
    const allData = getAllStorageData();
    const statistics = getStatistics();
    const dates = Object.keys(allData).sort();

    // Generar HTML del reporte
    const reportHTML = generateReportHTML(allData, statistics, dates);

    // Escribir contenido en la ventana
    printWindow.document.write(reportHTML);
    printWindow.document.close();

    // Esperar a que cargue el contenido y luego imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };

  } catch (error) {
    console.error('Error al exportar PDF:', error);
    throw error;
  }
}

function generateReportHTML(allData: any, statistics: any, dates: string[]): string {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reporte Mis Retos - ${currentDate}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #8ECAE6;
          padding-bottom: 20px;
        }
        
        .header h1 {
          font-size: 28px;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .header h2 {
          font-size: 16px;
          color: #7f8c8d;
          font-weight: normal;
        }
        
        .header .date {
          font-size: 12px;
          color: #95a5a6;
          margin-top: 10px;
        }
        
        .statistics {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #8ECAE6;
        }
        
        .statistics h3 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }
        
        .stat-item {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 5px;
          border: 1px solid #e9ecef;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #8ECAE6;
          display: block;
        }
        
        .stat-label {
          font-size: 12px;
          color: #7f8c8d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .day-section {
          margin-bottom: 30px;
          break-inside: avoid;
        }
        
        .day-header {
          background: linear-gradient(135deg, #8ECAE6, #A8DADC);
          color: white;
          padding: 15px 20px;
          border-radius: 8px 8px 0 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .activities-list {
          background: white;
          border: 1px solid #e9ecef;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        
        .activity-item {
          padding: 15px 20px;
          border-bottom: 1px solid #f1f3f4;
          display: flex;
          justify-content: between;
          align-items: center;
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .activity-name {
          flex: 1;
          font-size: 16px;
          color: #2c3e50;
        }
        
        .activity-count {
          background: #8ECAE6;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          min-width: 40px;
          text-align: center;
        }
        
        .empty-day {
          padding: 20px;
          text-align: center;
          color: #7f8c8d;
          font-style: italic;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          text-align: center;
          font-size: 12px;
          color: #7f8c8d;
        }
        
        .page-break {
          page-break-before: always;
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          .statistics {
            background: #f8f9fa !important;
            -webkit-print-color-adjust: exact;
          }
          
          .day-header {
            background: linear-gradient(135deg, #8ECAE6, #A8DADC) !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
          }
          
          .activity-count {
            background: #8ECAE6 !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Mis Retos</h1>
        <h2>Taller de Regulación Emocional Juan Orta</h2>
        <div class="date">Reporte generado el ${currentDate}</div>
      </div>
      
      <div class="statistics">
        <h3>Resumen General</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">${statistics.activeDays}</span>
            <span class="stat-label">Días Activos</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${statistics.totalActivities}</span>
            <span class="stat-label">Total Retos</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${statistics.totalCompletions}</span>
            <span class="stat-label">Completados</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${statistics.totalActivities > 0 ? Math.round((statistics.totalCompletions / statistics.totalActivities) * 100) / 100 : 0}</span>
            <span class="stat-label">Promedio por Reto</span>
          </div>
        </div>
      </div>
      
      ${dates.length === 0 ? `
        <div class="day-section">
          <div class="day-header">Sin datos</div>
          <div class="empty-day">
            No hay datos registrados aún
          </div>
        </div>
      ` : dates.map((date, index) => {
        const activities = allData[date];
        const totalCount = activities.reduce((sum: number, activity: any) => sum + activity.count, 0);
        
        return `
          <div class="day-section ${index > 0 && index % 3 === 0 ? 'page-break' : ''}">
            <div class="day-header">
              ${formatDateForDisplay(date)} (${totalCount} completados)
            </div>
            <div class="activities-list">
              ${activities.length === 0 ? `
                <div class="empty-day">Sin retos registrados</div>
              ` : activities.map((activity: any) => `
                <div class="activity-item">
                  <span class="activity-name">${activity.name}</span>
                  <span class="activity-count">${activity.count}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
      
      <div class="footer">
        <p>Taller de Regulación Emocional - Juan Orta</p>
        <p>Aplicación "Mis Retos" - Reporte generado automáticamente</p>
      </div>
    </body>
    </html>
  `;
}
