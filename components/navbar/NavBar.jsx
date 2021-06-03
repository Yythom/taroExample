import React from 'react';
import {
    View, Text,
} from '@tarojs/components';
import { navigateBack, setStorageSync } from '@tarojs/taro';
import classnames from 'classnames';
import { lkGetSystemInfo } from '../../common/publicFunc';
import './navbar.scss';

const globalSystemInfo = lkGetSystemInfo();
const defaultProps = {
    className: '',
    background: '#fff', // 导航栏背景
    color: '#000000', // 颜色
    title: '', // 中间的标题
    back: false, // 是否显示返回按钮
    home: false, // 是否显示首页按钮
    iconColor: 'black', // 图标的颜色
    delta: 1, // 返回触发时的返回次数
    placeholder: false, // 是否有占位块
};

const NavBar = (_props) => {
    const props = { ...defaultProps, ..._props };

    const {
        className,
        back,
        home,
        title,
        renderLeft,
        renderCenter,
        renderRight,
        color,
        background,
        iconColor,
        onBack,
        onHome,
        delta,
        placeholder,
    } = props;

    /**
     * 生成所需的Style对象集
     * @param {Object} systemInfo 系统信息
     */
    const setStyle = (systemInfo) => {
        const {
            statusBarHeight, navBarHeight, capsulePosition, navBarExtendHeight, ios, windowWidth,
        } = systemInfo;

        // 胶囊按钮右侧到屏幕右侧的距离
        const rightDistance = windowWidth - capsulePosition.right;
        // 胶囊按钮左侧到屏幕右侧的距离
        const leftWidth = windowWidth - capsulePosition.left;

        const navInnerStyle = {
            color,
            background,
            height: `${navBarHeight + navBarExtendHeight}PX`,
            paddingTop: `${statusBarHeight}PX`,
            paddingRight: `${leftWidth + rightDistance}PX`,
        };
        setStorageSync('navHeight', navBarHeight + navBarExtendHeight)
        let navLeftStyle = null;
        if ((back && !home) || (!back && home)) {
            navLeftStyle = {
                width: `${capsulePosition.width}PX`,
                height: `${capsulePosition.height}PX`,
                marginLeft: `${rightDistance}PX`,
                marginRight: `${rightDistance}PX`,
            };
        } else if ((back && home) || title) {
            navLeftStyle = {
                width: `${capsulePosition.width}PX`,
                height: `${capsulePosition.height}PX`,
                marginLeft: `${rightDistance}PX`,
                marginRight: `${rightDistance}PX`,
            };
        } else {
            navLeftStyle = {
                width: 'auto',
                marginLeft: `${rightDistance}PX`,
                marginRight: `${rightDistance}PX`,
            };
        }

        const placeholderStyle = {
            height: `${navBarHeight + navBarExtendHeight}PX`,
        };

        const iconStyle = {
            color: iconColor,
            fontSize: '18PX',
            width: '100%',
            height: '66%',
        };

        return {
            navInnerStyle,
            navLeftStyle,
            iconStyle,
            navBarHeight,
            capsulePosition,
            navBarExtendHeight,
            ios,
            rightDistance,
            placeholderStyle,
        };
    };

    const configStyle = setStyle(globalSystemInfo);

    const {
        navInnerStyle,
        navLeftStyle,
        placeholderStyle,
        iconStyle,
        ios,
    } = configStyle;

    const handleBackClick = () => {
        if (onBack && typeof onBack === 'function') {
            onBack();
        } else {
            navigateBack({
                delta,
            });
        }
    };

    const handleGoHomeClick = () => {
        if (onHome && typeof onHome === 'function') {
            onHome();
        }
    };

    return (
        <View className='ty-nav-bar' style={placeholderStyle}>
            {
                placeholder ? <View className='ty-nav-bar__placeholder' style={placeholderStyle} /> : null
            }
            <View className={classnames(['ty-nav-bar__inner', ios ? 'ios' : 'android', className])} style={navInnerStyle} >
                <View className='ty-nav-bar__left' style={navLeftStyle}>
                    {
                        back && !home ? (
                            <View onClick={handleBackClick} className='iconfont icon-fanhui' style={iconStyle} />
                        ) : null
                    }
                    {
                        !back && home ? (
                            <View onClick={handleGoHomeClick} className='iconfont icon-home' style={iconStyle} />
                        ) : null
                    }
                    {
                        back && home ? (
                            <View className={classnames(['ty-nav-bar__buttons', ios ? 'ios' : 'android'])}>
                                <View onClick={handleBackClick} className='iconfont icon-fanhui' style={iconStyle} />
                                <View onClick={handleGoHomeClick} className='iconfont icon-home' style={iconStyle} />
                            </View>
                        ) : null
                    }
                    {
                        !back && !home ? renderLeft : null
                    }
                </View>
                <View className='ty-nav-bar__center'>
                    {
                        title ? (
                            <Text style={{
                                textAlign: 'center',
                                fontSize: '36rpx',
                                display: 'inline-block',
                                width: '100%',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                marginTop: '6rpx',
                                whiteSpace: 'nowrap',
                            }}
                            >{title}
                            </Text>
                        ) : (renderCenter || null)
                    }
                </View>
                <View className='ty-nav-bar__right'>{renderRight || null}</View>
            </View>
        </View>
    );
};

export default NavBar;
