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
    if ('webkitSpeechRecognition' in window) {
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
    } else {
      setError('该浏览器不支持语音识别功能');
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.warn('语音识别未初始化');
      return;
    }

    if (!isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('启动语音识别失败:', err);
        setError('启动语音识别失败');
      }
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

  return { isListening, toggleListening, error };
};