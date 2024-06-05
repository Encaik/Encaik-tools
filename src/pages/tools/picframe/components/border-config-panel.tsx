import { BorderConfig, BorderConfigItem } from '../model';
import BorderConfigItemCard from './border-config-item-card';

export default function BorderConfigPanel(props: {
  borderConfig: BorderConfig;
  setBorderConfig: (borderConfig: BorderConfig) => void;
}) {
  return (
    <>
      <BorderConfigItemCard
        title={'相机型号'}
        config={props.borderConfig.model}
        onChange={(model: BorderConfigItem) => {
          props.setBorderConfig({
            ...props.borderConfig,
            model,
          });
        }}
      ></BorderConfigItemCard>
      <BorderConfigItemCard
        title={'拍摄时间'}
        config={props.borderConfig.time}
        onChange={(time: BorderConfigItem) => {
          props.setBorderConfig({
            ...props.borderConfig,
            time,
          });
        }}
      ></BorderConfigItemCard>
      <BorderConfigItemCard
        title={'拍摄参数'}
        config={props.borderConfig.info}
        onChange={(info: BorderConfigItem) => {
          props.setBorderConfig({
            ...props.borderConfig,
            info,
          });
        }}
      ></BorderConfigItemCard>
      <BorderConfigItemCard
        title={'画面尺寸'}
        config={props.borderConfig.size}
        onChange={(size: BorderConfigItem) => {
          props.setBorderConfig({
            ...props.borderConfig,
            size,
          });
        }}
      ></BorderConfigItemCard>
      <BorderConfigItemCard
        title={'Logo'}
        type={'img'}
        config={props.borderConfig.logo}
        onChange={(logo: BorderConfigItem) => {
          props.setBorderConfig({
            ...props.borderConfig,
            logo,
          });
        }}
      ></BorderConfigItemCard>
    </>
  );
}
