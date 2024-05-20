import { Alert } from 'antd';
import './offlineApp.css';

const OfflineApp = () => {
  return (
    <div className="offline">
      <Alert message="Хуситы опять перерезали кабель" type="error" />
    </div>
  );
};

export default OfflineApp;
