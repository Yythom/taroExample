import React from 'react';
import { View, CheckboxGroup, Checkbox } from '@tarojs/components';


const LkCheckGroup = ({
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
        <CheckboxGroup onChange={(e) => {
            console.log(e.detail.value);
            onChange(e.detail.value)
        }}
        >
            {
                list.map((item, i) => {
                    return (
                        <View className='radio-list__label' key={i}>
                            <Checkbox className='checkbox-list__checkbox' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                        </View>
                    )
                })
            }
        </CheckboxGroup>
    )
}
export default LkCheckGroup;
