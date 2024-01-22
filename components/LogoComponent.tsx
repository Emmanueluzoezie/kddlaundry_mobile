import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import tailwind from 'twrnc';
import { appColor } from './AppColor';

const LogoComponent = ({image, name, titleOne, titleTwo, subtitle, typingDelay = 25 }:any) => {
    const [displayedTexts, setDisplayedTexts] = useState(['', '', '', '', '']);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const allTexts = [image, name, titleOne, titleTwo, subtitle];

    useEffect(() => {
        if (currentTextIndex < allTexts.length) {
            const currentText = allTexts[currentTextIndex];
            let charIndex = 0;

            setDisplayedTexts((oldTexts) => {
                const newTexts = [...oldTexts];
                newTexts[currentTextIndex] = currentText.charAt(0);
                return newTexts;
            });

            const typeNextChar = () => {
                charIndex++;
                if (charIndex < currentText.length) {
                    setDisplayedTexts((oldTexts) => {
                        const newTexts = [...oldTexts];
                        newTexts[currentTextIndex] += currentText.charAt(charIndex);
                        return newTexts;
                    });
                    setTimeout(typeNextChar, typingDelay);
                } else {
                    setTimeout(() => setCurrentTextIndex(currentTextIndex + 1), typingDelay * 10);
                }
            };

            setTimeout(typeNextChar, typingDelay); // Start typing from the second character
        }
    }, [currentTextIndex, name, titleOne, titleTwo, subtitle, typingDelay]);

    return (
        <View style={[tailwind`flex-1 justify-center items-center`]}>
           <View style={[tailwind`flex-row items-center`]}>
            <View style={[tailwind`pr-2`]}>
                <Image source={{ uri: displayedTexts[0]}} style={[tailwind`w-[100px] h-[100px]`]}/>
            </View>
            <View style={styles.container}>
                    {displayedTexts.slice(1, 4).map((text, index) => (
                    <Text key={index} style={[tailwind`text-[26px] font-bold`, styles.typewriterText]}>
                        {text}
                    </Text>
                ))}
            </View>
           </View>
            <Text style={[tailwind`text-[16px] mt-2 font-bold`]}>{displayedTexts[4]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    typewriterText: {
        color: appColor.primaryColor
    },
});

export default LogoComponent;