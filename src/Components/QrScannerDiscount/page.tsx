import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import './styles.module.scss';
import { useRouter } from 'next/navigation';
import { assigndcodigodto, assignpropdto } from '@/DTOS/workline/codigos/codigos.dto';

const updateFetcher = async (url: string, data: assigndcodigodto) => fetch(url, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json())

const QRScannerDiscount = (assignprops: assignpropdto) => {
  const videoElementRef = useRef(null);
  const router = useRouter()
  const [scanned, setScannedText] = useState('');

  const AssignDiscount = (uuid:string) => {
    if(uuid !== '' || uuid != null){
      let newAssign = {

      }as assigndcodigodto
      
      updateFetcher('/api/workline/codigos/assign', newAssign).then((data) => {
        if (data.succeeded){
          router.push(`/workline/tickets/Details/${assignprops.uuidticket}`)
        }
        else
          setScannedText(uuid+data);

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
      console.log(qrScanner);
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
        <video className="qrVideo" height={500} width={300} ref={videoElementRef} />
      </div>
      <p className="scannedText">SCANNED: {scanned}</p>
    </div>
  );
};

export default QRScannerDiscount;
