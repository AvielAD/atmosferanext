import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import './styles.module.scss';
import { useRouter } from 'next/navigation';
import { assigndcodigoinputdto, assignpropdto } from '@/DTOS/workline/codigos/codigos.dto';

const updateFetcher = async (url: string, data: assigndcodigoinputdto) => fetch(url, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json())

const QRScannerDiscount = (assignprops: assignpropdto) => {
  const videoElementRef = useRef(null);
  const router = useRouter()
  const [scanned, setScannedText] = useState('');

  const AssignDiscount = (uuid: string) => {
    if (uuid !== '' || uuid != null) {
      let newAssign = {
        idcodigouuid: uuid,
        idticket: assignprops.idticket
      } as assigndcodigoinputdto

      updateFetcher('/api/workline/codigos/assign', newAssign).then((data) => {
        assignprops.closemodal({
          showModal: false,
          triggerToast: true,
          serverresponse: {
            message: data.message,
            succeeded: data.succeeded
          }
        })

      })
    }


  }
  useEffect(() => {
    const video: HTMLVideoElement = videoElementRef.current ?? new HTMLVideoElement();
    const qrScanner = new QrScanner(
      video,
      (result) => {
        //setScannedText(result.data);
        AssignDiscount(result.data)
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  // const qrScanner = new QrScanner(videoElement, (result) =>
  //   console.log('decoded qr code:', result)
  // );

  return (
    <div>
      <div className="videoWrapper">
        <video className="qrVideo" height={400} width={220} ref={videoElementRef} />
      </div>
    </div>
  );
};

export default QRScannerDiscount;
