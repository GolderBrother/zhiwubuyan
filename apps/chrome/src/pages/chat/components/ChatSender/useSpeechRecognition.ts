import { useState, useEffect, useRef } from 'react';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export const useSpeechRecognition = (onResult?: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const initRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('该浏览器不支持语音识别功能');
      return;
    }

    // 检查麦克风权限
    navigator.permissions.query({ name: 'microphone' as any }).then((permissionStatus) => {
      if (permissionStatus.state === 'denied') {
        setError('请允许麦克风权限以使用语音识别功能');
        return;
      }

      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      if (!recognitionRef.current) return;

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        onResult?.('');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const results = event.results[event.results.length - 1];
        if (results.isFinal) {
          const result = results[0].transcript.trim();
          onResult?.(result);
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('语音识别错误:', event.error);
        setError(`语音识别错误: ${event.error}`);
        setIsListening(false);
      };
    });
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.warn('语音识别未初始化');
      return;
    }

    if (!isListening) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          recognitionRef.current.start();
        })
        .catch((err) => {
          // console.error('启动语音识别失败:', err);
          // setError('启动语音识别失败');
          console.error('麦克风权限被拒绝:', err);
          // 添加重置逻辑
          if (err.name === 'NotAllowedError') {
            if (confirm('麦克风权限被拒绝，是否前往设置页面？')) {
              chrome.tabs.create({
                // url: 'chrome://settings/content/microphone',
                url: 'chrome://settings/content/siteDetails?site=chrome-extension%3A%2F%2Fkbploeoeoalkicbddgopdndifjdkolcn'
              });
            }
          } else {
            setError('请允许麦克风权限以使用语音识别');
          }
        });
    } else {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    initRecognition();

    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { isListening, setIsListening, toggleListening, error };
};