import React from 'react';
import { View } from '@tarojs/components';

import './modal.scss';

const Modal = ({
  show,
  title,
  text,
  renderHeader,
  renderContent,
  renderFooter,
  onOk,
  onCancel,
  className,
}) => {
  const handleConfirm = () => {
    if (onOk && typeof onOk === 'function') {
      onOk();
    } else {
      console.warn('onOk is not a function');
    }
  };

  const handleCancel = () => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    } else {
      console.warn('onCancel is not a function');
    }
  };

  const handleStopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {
        show ? (
          <>
            <View className='modal-mask' onClick={handleStopProp} onTouchMove={handleStopProp} />
            <View className={`modal ${className}`} onClick={handleStopProp} onTouchMove={handleStopProp}>
              {
                renderHeader || (
                  <View className='modal-header'>
                    <View className='modal-header__box'>
                      <View className='modal-header__title'>{title}</View>
                    </View>
                  </View>
                )
              }
              {
                renderContent || (
                  <View className='modal-content'>
                    {text}
                  </View>
                )
              }
              {
                renderFooter || (
                  <View className='modal-footer'>
                    <View className='modal-footer__btn cancel' onClick={handleCancel}>取消</View>
                    <View className='modal-footer__btn confirm' onClick={handleConfirm}>确认</View>
                    <View className='modal-footer__divider' />
                  </View>
                )
              }
            </View>
          </>
        ) : null
      }
    </>
  );
};

export default Modal;
