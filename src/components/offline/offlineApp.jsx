import { Alert } from 'antd';
import './offlineApp.css';

const OfflineApp = () => {
  return (
    <div className="offline">
      <Alert message="No internet connection" type="error" />
    </div>
  );
};

export default OfflineApp;
