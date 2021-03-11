import React from 'react';
import { View, Image } from '@tarojs/components';
import './styles/step.scss'

const Step = ({ step, className, lineColor, lineH, lineW, isShowIndex }) => {



    return (
        <View className={`Step_wrap ${className}`}>
            {
                (step && step[0] && step.length >= 2)
                && step.map((e, i) => {
                    return (
                        <View className='step_item' key={'step' + e}>
                            <View className='item'>
                                <View className='c_n'>
                                    <View className='round' style={{ background: lineColor }} />
                                    {isShowIndex && <View className='step_text'>{i + 1}</View>}
                                </View>
                                {i + 1 != step.length && <View className='line' style={{ background: lineColor, width: lineW + 'rpx', height: lineH + 'rpx', }} ></View>}
                            </View>
                            <View className='content'>{e}</View>
                        </View>
                    )
                })
            }
        </View>
    )
}


export default Step;
