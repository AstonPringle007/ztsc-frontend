import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

interface AnomalyRecord {
  id: string;
  user: string;
  device: string;
  activity: string;
  anomalyScore: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  indicator: string;
  timestamp: string;
  status: 'DETECTED' | 'REVIEWING' | 'CONFIRMED' | 'FALSE_POSITIVE';
}

@Component({
  selector: 'app-anomaly-detection',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTableModule 
  ],
  templateUrl: './anomaly-detection.html',
  styleUrl: './anomaly-detection.scss'
})
export class AnomalyDetectionComponent {

  private readonly snackBar = inject(MatSnackBar);

  isScanning = signal(false);

  lastScan = signal('04 Oct 2026 04:10 PM');

  anomalies = signal<AnomalyRecord[]>([
    {
      id: 'ANM-001',
      user: 'Unknown',
      device: 'Unknown-Device',
      activity: 'Repeated unauthorized requests',
      anomalyScore: 97,
      risk: 'CRITICAL',
      indicator: 'Untrusted device + unusual IP',
      timestamp: '04 Oct 2026 03:42 PM',
      status: 'DETECTED'
    },
    {
      id: 'ANM-002',
      user: 'Rajesh Kumar',
      device: 'Supplier-Laptop',
      activity: 'Abnormal request frequency',
      anomalyScore: 89,
      risk: 'HIGH',
      indicator: 'Request frequency 4.7x baseline',
      timestamp: '04 Oct 2026 03:18 PM',
      status: 'REVIEWING'
    },
    {
      id: 'ANM-003',
      user: 'Arun Kumar',
      device: 'Finance-Desktop',
      activity: 'Restricted resource access',
      anomalyScore: 82,
      risk: 'HIGH',
      indicator: 'Unexpected resource access pattern',
      timestamp: '04 Oct 2026 02:56 PM',
      status: 'DETECTED'
    },
    {
      id: 'ANM-004',
      user: 'Suresh Kumar',
      device: 'Auditor-System',
      activity: 'Unusual login timing',
      anomalyScore: 64,
      risk: 'MEDIUM',
      indicator: 'Login outside normal activity window',
      timestamp: '04 Oct 2026 01:52 PM',
      status: 'REVIEWING'
    },
    {
      id: 'ANM-005',
      user: 'Pringle',
      device: 'Pringle-Laptop',
      activity: 'High-volume API requests',
      anomalyScore: 31,
      risk: 'LOW',
      indicator: 'Slightly above normal API usage',
      timestamp: '04 Oct 2026 01:25 PM',
      status: 'FALSE_POSITIVE'
    },
    {
      id: 'ANM-006',
      user: 'Manoj Kumar',
      device: 'Warehouse-Scanner',
      activity: 'Repeated inventory queries',
      anomalyScore: 24,
      risk: 'LOW',
      indicator: 'Normal warehouse activity',
      timestamp: '04 Oct 2026 12:48 PM',
      status: 'CONFIRMED'
    }
  ]);

  totalAnalyzed = signal(1248);

  detectedAnomalies = computed(() =>
    this.anomalies().filter(
      anomaly => anomaly.status === 'DETECTED'
    ).length
  );

  highRiskAnomalies = computed(() =>
    this.anomalies().filter(
      anomaly =>
        anomaly.risk === 'HIGH' ||
        anomaly.risk === 'CRITICAL'
    ).length
  );

  confirmedAnomalies = computed(() =>
    this.anomalies().filter(
      anomaly => anomaly.status === 'CONFIRMED'
    ).length
  );

  falsePositives = computed(() =>
    this.anomalies().filter(
      anomaly => anomaly.status === 'FALSE_POSITIVE'
    ).length
  );

  averageAnomalyScore = computed(() => {

    const records = this.anomalies();

    if (!records.length) {
      return 0;
    }

    const total = records.reduce(
      (sum, anomaly) => sum + anomaly.anomalyScore,
      0
    );

    return Math.round(total / records.length);
  });

  runScan(): void {

    this.isScanning.set(true);

    setTimeout(() => {

      this.totalAnalyzed.update(
        value => value + Math.floor(Math.random() * 100) + 50
      );

      this.lastScan.set(
        new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      );

      this.isScanning.set(false);

      this.snackBar.open(
        'AI anomaly scan completed successfully.',
        'Close',
        { duration: 3000 }
      );

    }, 1500);
  }

  reviewAnomaly(anomaly: AnomalyRecord): void {

    this.anomalies.update(records =>
      records.map(item =>
        item.id === anomaly.id
          ? { ...item, status: 'REVIEWING' }
          : item
      )
    );

    this.snackBar.open(
      `${anomaly.id} moved to review.`,
      'Close',
      { duration: 3000 }
    );
  }

  confirmAnomaly(anomaly: AnomalyRecord): void {

    this.anomalies.update(records =>
      records.map(item =>
        item.id === anomaly.id
          ? { ...item, status: 'CONFIRMED' }
          : item
      )
    );

    this.snackBar.open(
      `${anomaly.id} confirmed as an anomaly.`,
      'Close',
      { duration: 3000 }
    );
  }

  markFalsePositive(anomaly: AnomalyRecord): void {

    this.anomalies.update(records =>
      records.map(item =>
        item.id === anomaly.id
          ? { ...item, status: 'FALSE_POSITIVE' }
          : item
      )
    );

    this.snackBar.open(
      `${anomaly.id} marked as false positive.`,
      'Close',
      { duration: 3000 }
    );
  }

  getRiskClass(risk: string): string {
    return risk.toLowerCase();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getScoreClass(score: number): string {

    if (score >= 90) {
      return 'critical';
    }

    if (score >= 70) {
      return 'high';
    }

    if (score >= 40) {
      return 'medium';
    }

    return 'low';
  }
}