/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { View, Button } from '@tarojs/components';
import { lkGetUserInfo } from '../../common/publicFunc';
// import { userStore } from '../store';
import { actions } from '../../store/userStore';
import './withAuth.scss';


const WithUserVerify = ({
    className,
    onClick,
    style,
    children,
    isVerifyPhone,
}) => {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const handleClick = async (e) => {
        e.stopPropagation();
        if (onClick && typeof onClick === 'function') {
            onClick();
        }
    };
    useDidShow(() => {
        getSettingFn();
    })
    async function getSettingFn() {
        const settingInfo = await Taro.getSetting();
        // 用户之前拒绝过获取个人开放信息
        if (settingInfo.authSetting['scope.userInfo'] !== undefined && settingInfo.authSetting['scope.userInfo'] !== true) {
            setType('openSetting')
        } else {
            setType('')
        }
    }
    const handleGetUserInfo = async () => {

        if (!type) {
            const userInfoRes = await lkGetUserInfo();
            if (userInfoRes !== 'openSetting') {
                dispatch(actions.setUserInfo(userInfoRes));
                dispatch(actions.changeTokenActionAsync('data---test'));
                Taro.showToast({
                    icon: 'none',
                    title: '获取用户信息成功'
                })
                setType('');
                if (!isVerifyPhone) onClick();
            } else {
                Taro.showToast({
                    icon: 'none',
                    title: '拒绝授权'
                })
                setType('openSetting')
            }
        }
    };


    const handleGetPhoneNumber = async (e) => {
        /**
         * detail.encryptedData 包括敏感数据在内的完整用户信息的加密数据
         * detail.iv 加密算法的初始向量
         */
        const { detail } = e;
        if (detail.iv) {

            // const res = await UserService.bindPhone(detail.iv, detail.encryptedData);
            // if (res) {
            //   // 更新本地的UserInfo
            // }
            Taro.showToast({
                icon: 'none',
                title: '绑定手机号成功'
            })
            dispatch(actions.setPhone(''));
            onClick();
        }
    };
    return (
        <>
            {
                !userInfo && !userInfo?.avatar ? (
                    // eslint-disable-next-line no-undef
                    !wx.canIUse('getUserProfile') ?
                        <Button style={style}
                            openType={type ? type : 'getUserInfo'}
                            onGetUserInfo={handleGetUserInfo}
                            className={`with-button ${className}`}
                        >
                            {children}
                        </Button>
                        : <Button style={style}
                            onClick={() => { handleGetUserInfo() }}
                            className={`with-button ${className}`}
                        >
                            {children}
                        </Button>
                )
                    : !userInfo.phone && isVerifyPhone
                        ? (
                            <Button style={style} className={`with-button ${className}`} openType='getPhoneNumber' onGetPhoneNumber={handleGetPhoneNumber}>
                                {children}
                            </Button>
                        )
                        : (
                            <View style={style} className={className} onClick={handleClick}>
                                {children}
                            </View>
                        )
            }
        </>
    );
};

export default WithUserVerify;
