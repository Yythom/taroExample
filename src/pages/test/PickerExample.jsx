import React from 'react';
import { Picker, View } from '@tarojs/components';


const PickerExample = () => {
    return (
        <View className='pick-wrap'>
            <Picker mode='region' value={["浙江省", "杭州市", "西湖区"]} onChange={((e) => {
                console.log(e);
            })}
            >
                <View className='picker'>
                    省市：
</View>
            </Picker>
            <Picker mode='time' value='00:04' onChange={((e) => {
                console.log(e);
            })}
            >
                <View className='picker'>
                    时间：
</View>
            </Picker>
            <Picker mode='date' value='2021-02-12' onChange={((e) => {
                console.log(e);
            })}
            >
                <View className='picker'>
                    日期：
</View>
            </Picker>
            <Picker mode='multiSelector' range={[['123', '32'], '中国', '1']} onChange={((e) => {
                console.log(e);
            })}
            >
                <View className='picker'>
                    自定义：
</View>
            </Picker>
            <Picker mode='selector' range={['美国', '中国', '巴西', '日本']} >
                <View className='picker'>
                    当前选择：
</View>
            </Picker>
        </View>
    )
}
export default PickerExample;


