import React from 'react';
import { RadioGroup, Radio, View } from '@tarojs/components';


const LkRadioGroup = ({
    list = [
        {
            value: '2',
            text: '2',
            // checked: false
        },
        {
            value: '1',
            text: '1',
            // checked: false
        },
    ],
    onChange = Function.prototype
}) => {
    return (
        <RadioGroup onChange={(e) => {
            onChange(e.detail)
        }}
        >
            {

                list.map((item, i) => {
                    return (
                        <View className='radio-list__label' for={i} key={i}>
                            <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                        </View>
                    )
                })
            }
        </RadioGroup>
    )
}
export default LkRadioGroup;
