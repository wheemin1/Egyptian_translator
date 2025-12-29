import { Copy, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { romanizedToHieroglyphText } from '@/constants/hieroglyphMapping';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionButtonsProps {
  romanizedName: string;
  cardRef: React.RefObject<HTMLDivElement>;
}

const ActionButtons = ({ romanizedName, cardRef }: ActionButtonsProps) => {
  const handleCopy = async () => {
    try {
      const hieroglyphText = romanizedToHieroglyphText(romanizedName);
      await navigator.clipboard.writeText(hieroglyphText || romanizedName.toUpperCase());
      toast.success('상형문자가 복사되었습니다!', {
        className: 'font-sans',
      });
    } catch {
      toast.error('복사에 실패했습니다');
    }
  };

  const handleSave = async () => {
    const target = document.getElementById('cartouche-card') ?? cardRef.current;
    if (!target) return;
    
    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(target, {
        backgroundColor: '#F9F7F2',
        scale: 3,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `egyptian-name-${romanizedName.toLowerCase().replace(/\s/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success('이미지가 저장되었습니다', {
        className: 'font-sans',
      });
    } catch {
      toast.error('이미지 저장에 실패했습니다');
    }
  };

  const handleShare = async () => {
    const hieroglyphText = romanizedToHieroglyphText(romanizedName);
    const shareUrl = `${window.location.origin}/`;
    const shareData = {
      title: '고대 이집트어 번역기',
      text: `${romanizedName.toUpperCase()}\n${hieroglyphText || ''}`.trim(),
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        toast.success('링크가 복사되었습니다', {
          className: 'font-sans',
        });
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('공유에 실패했습니다');
      }
    }
  };

  const buttons = [
    { icon: Copy, label: '복사', onClick: handleCopy },
    { icon: Download, label: '이미지 저장', onClick: handleSave },
    { icon: Share2, label: '공유', onClick: handleShare },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div 
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        {buttons.map(({ icon: Icon, label, onClick }, index) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className="action-btn flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-gold" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-card text-soft-black text-xs border-border"
            >
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </TooltipProvider>
  );
};

export default ActionButtons;