import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import './styles.module.scss';
import { useRouter } from 'next/navigation';

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const router = useRouter()
  const [scanned, setScannedText] = useState('');

  const closeTicket = (uuid:string) => {
    if(uuid !== '' || uuid != null)
    fetch(`/api/workline/tickets/close/${uuid}`, {
        method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data.succeeded)
              router.push(`/workline/tickets/Details/${uuid}`)

        })

}
  useEffect(() => {
    const video: HTMLVideoElement = videoElementRef.current ?? new HTMLVideoElement();
    const qrScanner = new QrScanner(
      video,
      (result) => {
        //setScannedText(result.data);
        closeTicket(result.data)
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
  });

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

export default QRScanner;
