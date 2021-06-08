import React, { useState } from 'react';
import { Input, Text, View } from '@tarojs/components';
import { onKeyboardHeightChange } from '@tarojs/taro';
import { RefInfo, systemInfo } from '@/common/publicFunc';
import './modal.scss';

const Modal = ({
  show,
  setShow,
  title = '提示',
  content = '这是一段内容',
  onOk,
  onCancel,
  className,
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState('0');

  onKeyboardHeightChange(res => {
    RefInfo('modal__h').then(_res => {
      let dis = systemInfo.screenHeight - _res.bottom
      // console.log(dis, res.height, 'res');
      if (res.height + 20 > dis) {
        setKeyboardHeight(res.height + 20 - dis);
      } else setKeyboardHeight(0);
    })
  })


  const handleConfirm = () => {

    if (onOk && typeof onOk === 'function') {
      onOk();
    } else {
      console.warn('onOk is not a function');
    }
    setShow(false);
  };

  const handleCancel = () => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    } else {
      console.warn('onCancel is not a function');
    }
    setShow(false);
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
            <View className={`modal ${className}`}
              style={{ top: `calc(50% - ${keyboardHeight * 2}rpx)` }}
              onClick={handleStopProp}
              onTouchMove={handleStopProp}

            >
              {
                (
                  <View className='modal-header'>
                    <View className='modal-header__box'>
                      <View className='modal-header__title'>{title}</View>
                    </View>
                  </View>
                )
              }
              {
                (
                  <View className='modal-content'>
                    {content}
                    <Input />
                  </View>
                )
              }
              {
                (
                  <View className='modal-footer'>
                    <View className='modal-footer__btn cancel' onClick={handleCancel}>取消</View>
                    <View className='modal-footer__btn confirm' onClick={handleConfirm}>确定</View>
                    <View className='modal-footer__divider' />
                  </View>
                )
              }
              <Text className='modal__h' style={{ width: 0, height: 0 }}></Text>
            </View>
          </>
        ) : null
      }
    </>
  );
};

export default Modal;
