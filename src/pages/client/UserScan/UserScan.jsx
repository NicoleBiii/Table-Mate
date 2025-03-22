import './UserScan.scss';
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RotateCcw } from 'lucide-react';
import ClientHeader from '../../../components/ClientHeader/ClientHeader';

function ScanPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "scanner-container",
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        facingMode: "environment"
      },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        const tableNumber = decodedText.split('/').pop();
        navigate(`/user/${tableNumber}`);
      },
      (error) => {
        setCameraError(error || t("camera_error"));
      }
    );

    scannerRef.current = html5QrcodeScanner;

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(error => {
          console.log("Scanner cleanup error: ", error);
        });
      }
    };
  }, [navigate, t]);

  return (
    <div className="scan-page">
        <ClientHeader />
      <h1 className="scan-title">{t("scan_qr_code")}</h1>
      
      <div id="scanner-container" className="scanner-box">
        {cameraError && (
          <div className="error-message">
            <p>{cameraError}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              <RotateCcw size={18} />
              {t("retry")}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default ScanPage;