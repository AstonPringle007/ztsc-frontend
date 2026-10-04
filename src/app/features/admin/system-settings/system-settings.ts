import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './system-settings.html',
  styleUrl: './system-settings.scss'
})
export class SystemSettingsComponent {

  private readonly snackBar = inject(MatSnackBar);

  readonly zeroTrustEnabled = signal(true);
  readonly deviceVerification = signal(true);
  readonly continuousMonitoring = signal(true);
  readonly anomalyDetection = signal(true);
  readonly auditLogging = signal(true);
  readonly jwtAuthentication = signal(true);
  readonly loginAlerts = signal(true);
  readonly securityAlerts = signal(true);

  toggleSetting(
    setting: 'zeroTrustEnabled' |
      'deviceVerification' |
      'continuousMonitoring' |
      'anomalyDetection' |
      'auditLogging' |
      'jwtAuthentication' |
      'loginAlerts' |
      'securityAlerts'
  ): void {

    const current = this[setting]();

    this[setting].set(!current);

    this.snackBar.open(
      `${this.getSettingName(setting)} ${!current ? 'enabled' : 'disabled'}`,
      'Close',
      { duration: 2000 }
    );
  }

  saveSettings(): void {
    this.snackBar.open(
      'System settings saved successfully',
      'Close',
      { duration: 2500 }
    );
  }

  resetSettings(): void {
    this.zeroTrustEnabled.set(true);
    this.deviceVerification.set(true);
    this.continuousMonitoring.set(true);
    this.anomalyDetection.set(true);
    this.auditLogging.set(true);
    this.jwtAuthentication.set(true);
    this.loginAlerts.set(true);
    this.securityAlerts.set(true);

    this.snackBar.open(
      'Security settings restored to defaults',
      'Close',
      { duration: 2500 }
    );
  }

  private getSettingName(setting: string): string {
    const names: Record<string, string> = {
      zeroTrustEnabled: 'Zero Trust security',
      deviceVerification: 'Device verification',
      continuousMonitoring: 'Continuous monitoring',
      anomalyDetection: 'AI anomaly detection',
      auditLogging: 'Audit logging',
      jwtAuthentication: 'JWT authentication',
      loginAlerts: 'Login alerts',
      securityAlerts: 'Security alerts'
    };

    return names[setting] ?? 'Setting';
  }
}