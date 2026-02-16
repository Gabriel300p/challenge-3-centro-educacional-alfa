import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import React from "react";

interface QRCodeDialogProps {
  attendanceId: string;
  token: string;
  subject?: string;
  children: React.ReactNode;
}

export function QRCodeDialog({ attendanceId, token, subject, children }: QRCodeDialogProps) {
  const downloadQRCode = () => {
    const svg = document.getElementById(`qr-code-${attendanceId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = "/logo-solo.svg"; 

        logo.onload = () => {
          const logoSize = 50; 
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;

          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, logoSize / 2 + 2, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();

          ctx.drawImage(logo, x, y, logoSize, logoSize);

          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `qrcode-${subject || 'aula'}.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        };
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const qrCodeUrl = token 
    ? `${window.location.origin}/presenca/confirmar?attendanceId=${attendanceId}&token=${token}` 
    : 'TOKEN_INDISPONIVEL';

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">QR Code de Presença</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border relative">
            <QRCode 
              id={`qr-code-${attendanceId}`}
              level="H"
              value={qrCodeUrl} 
              size={200} 
            />
            <img 
              src="/logo-solo.svg" 
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full p-1 object-contain"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground font-mono">
            {token}
          </p>
          <Button 
            variant="outline" 
            className="mt-4 w-full"
            onClick={downloadQRCode}
          >
            Fazer download em PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}