import { FC, useCallback, useState } from 'react';
import { Sender, Suggestion } from '@ant-design/x';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Alert, theme, Tooltip, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import {
  // EnterIcon,
  Filter2Icon,
  Filter3Icon,
  CloseIcon,
} from 'tdesign-icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useStore';
import { setIsViewHistoryMode } from '@/store/historySlice';
import { addMessage } from '@/store/chatSlice';
import { useChat } from '@/hooks/useChat';
import { useSpeechRecognition } from './useSpeechRecognition';

const ChatSender: FC = () => {
  const dispatch = useAppDispatch();
  const { ollamaIsRunning } = useAppSelector((state) => state.ollama);
  const { responseStatus } = useAppSelector((state) => state.chat);
  const prompts = useAppSelector((state) => state.prompt).map((prompt) => ({
    ...prompt,
    icon: prompt.type === 'quick' ? <Filter2Icon /> : <Filter3Icon />,
  }));

  const [userContent, setUserContent] = useState<string>('');
  const [submitType, setSubmitType] = useState<'enter' | 'shiftEnter' | false>('enter');
  const [selectedSystemPrompt, setSelectedSystemPrompt] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const { sendMessage, abortControl } = useChat();
  const handleChange = (nextVal: string, onTrigger: Function) => {
    if (nextVal === '/' && prompts.length) {
      setSubmitType(false);
      onTrigger();
    } else if (!nextVal) {
      setSubmitType('enter');
      onTrigger(false);
    }
    setUserContent(nextVal);
  };
  const handleSubmit = useCallback(() => {
    dispatch(setIsViewHistoryMode(false));
    setUserContent('');
    setSelectedSystemPrompt(null);

    if (selectedSystemPrompt) {
      dispatch(
        addMessage({ role: 'system', content: selectedSystemPrompt.value, createdAt: Date.now() })
      );
    }
    dispatch(addMessage({ role: 'user', content: userContent, createdAt: Date.now() }));
    sendMessage();
  }, [userContent]);

  const { token } = theme.useToken();
  const iconStyle = {
    fontSize: 18,
    color: token.colorText,
  };

  const { isListening, toggleListening, error } = useSpeechRecognition((text) => {
    console.log('useSpeechRecognition text', text);
    setUserContent(userContent + text);
  });
  const [openFilePanel, setOpenFilePanel] = useState(false);
  const headerNode = (
    <Sender.Header title="Upload Sample" open={openFilePanel} onOpenChange={setOpenFilePanel}>
      <Flex vertical align="center" gap="small" style={{ marginBlock: token.paddingLG }}>
        <CloudUploadOutlined style={{ fontSize: '4em' }} />
        <Typography.Title level={5} style={{ margin: 0 }}>
          Drag file here (just demo)
        </Typography.Title>
        <Typography.Text type="secondary">
          Support pdf, doc, xlsx, ppt, txt, image file types
        </Typography.Text>
        <Button
          onClick={() => {
            console.log('Mock select file');
          }}
        >
          Select File
        </Button>
      </Flex>
    </Sender.Header>
  );
  return (
    <Flex vertical gap="small">
      {selectedSystemPrompt && (
        <Alert
          message={
            <Flex
              gap="small"
              align="center"
              style={{ fontSize: 'var(--ant-font-size)', fontWeight: 'bold' }}
            >
              <Filter3Icon /> {selectedSystemPrompt.label}
            </Flex>
          }
          description={selectedSystemPrompt.value}
          type="info"
          closable={{
            'aria-label': 'close',
            closeIcon: <CloseIcon fontSize="16" />,
          }}
          onClose={() => setSelectedSystemPrompt(null)}
        />
      )}

      <Suggestion
        items={prompts}
        onSelect={(prompt) => {
          // 判断的是否为系统提示词
          const item = prompts.find((item) => item.value === prompt);
          if (item?.type === 'system') {
            setSelectedSystemPrompt(item);
            setUserContent('');
          } else {
            setUserContent(prompt);
          }

          setSubmitType('enter');
        }}
      >
        {({ onTrigger, onKeyDown }) => {
          return (
            <Sender
              loading={responseStatus === 'outputting'}
              submitType={submitType}
              allowSpeech={true}
              value={userContent}
              onChange={(nextVal) => {
                console.log('onChange nextVal', nextVal);
                handleChange(nextVal, onTrigger)
              }}
              onKeyDown={onKeyDown}
              onSubmit={() => handleSubmit()}
              onCancel={() => abortControl()}
              actions={false}
              header={headerNode}
              footer={({ components }) => {
                const { ClearButton, SendButton, LoadingButton, SpeechButton } = components;
                return (
                  <Flex justify="end" align="center">
                    <Button
                      style={iconStyle}
                      type="text"
                      icon={<LinkOutlined />}
                      onClick={() => setOpenFilePanel(true)}
                    />
                    <Tooltip title="清空">
                      <ClearButton />
                    </Tooltip>
                    <Tooltip title={isListening ? '停止语音输入' : '语音输入'}>
                      <SpeechButton style={iconStyle} onClick={toggleListening} />
                    </Tooltip>
                    <Divider type="vertical" style={{ marginRight: 15 }} />
                    {responseStatus !== 'end' ? (
                      <LoadingButton type="default" />
                    ) : (
                      <Tooltip title="发送">
                        <SendButton
                          color="primary"
                          // variant="solid"
                          // icon={<EnterIcon style={{ fontSize: 16 }} />}
                          // shape="default"
                          type="primary"
                          disabled={
                            !userContent.length || responseStatus !== 'end' || !ollamaIsRunning
                          }
                        />
                      </Tooltip>
                    )}
                  </Flex>
                );
              }}
            />
          );
        }}
      </Suggestion>
    </Flex>
  );
};

export default ChatSender;
