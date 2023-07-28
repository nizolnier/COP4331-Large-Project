import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Reviews = () => {
    return (
        <SafeAreaView className="relative rounded-[40px] bg-main-color-background w-full h-[812px] overflow-hidden text-left text-4xs text-white font-open-sans">
            <View className="absolute top-[288px] left-[20px] rounded-xl bg-darkslategray w-[335px] h-[410px]" />
            <Text className="absolute top-[149px] left-[20px]">
                Specify the date you watched it
            </Text>
            <Text className="absolute top-[213px] left-[20px]">Give your rating</Text>
            <Image
                className="absolute top-[104px] left-[239px] w-[116px] h-[166px] object-cover"
                src="https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7"
            />
            <Text className="absolute top-[104px] left-[20px] text-[16px]">{`SpongeBob Squarepants `}</Text>
            <Text className="absolute top-[46px] left-[54px] text-smi font-semibold">
                Write Your Review
            </Text>
            {/* <Image
                className="absolute h-[2.09%] w-[23.95%] top-[28.45%] right-[70.72%] bottom-[69.46%] left-[5.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/stars.svg"
            /> */}
            {/* <Image
                className="absolute h-[2.09%] w-[5.06%] top-[28.45%] right-[48.27%] bottom-[69.46%] left-[46.67%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/like.svg"
            /> */}
            <Text className="absolute top-[304px] left-[38px] text-[10px] font-semibold text-white1">
                Write down your review...
            </Text>
            <View className="absolute top-[716px] left-[251px] w-[104px] h-9 text-smi text-main-color-background">
                <View className="absolute top-[0px] left-[0px] rounded-xl bg-second-color w-[104px] h-9" />
                <Text className="absolute top-[9px] left-[29px] font-semibold">
                    Publish
                </Text>
            </View>
            <View className="absolute top-[167px] left-[20px] w-[174px] h-7">
                <View className="absolute top-[0px] left-[0px] rounded-xl bg-darkslategray w-[174px] h-7" />
                {/* <Image
                    className="absolute h-[45.71%] w-[7.36%] top-[27.14%] right-[84.25%] bottom-[27.14%] left-[8.39%] max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/date.svg"
                /> */}
                <Text className="absolute top-[8px] left-[40px]">27 June 2023</Text>
                <Text className="absolute top-[9px] left-[136px] text-[7px] font-semibold text-second-color">
                    Change
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Reviews;