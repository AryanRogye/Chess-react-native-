import React, { useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { styles } from '../views/Home/styles';
import DropDownPicker from 'react-native-dropdown-picker';

interface RenderUIControlsProps {
    border                 : boolean;
    setBorder              : React.Dispatch<React.SetStateAction<boolean>>;
    darkMode               : boolean;
    setDarkMode            : React.Dispatch<React.SetStateAction<boolean>>;
    boldPieceText          : boolean;
    setBoldPieceText       : React.Dispatch<React.SetStateAction<boolean>>;
    darkModeBackground     : string;
    lightModeBackground    : string;
    setDarkModeBackground  : React.Dispatch<React.SetStateAction<String>>;
    setLightModeBackground : React.Dispatch<React.SetStateAction<String>>;
    backgroundColor        : string;
}

export default function RenderUIControls({
    border,
    setBorder,
    darkMode,
    setDarkMode,
    boldPieceText,
    setBoldPieceText,
    darkModeBackground,
    lightModeBackground,
    setDarkModeBackground,
    setLightModeBackground,
    backgroundColor
}: RenderUIControlsProps) 
{   
    const [darkModeOpen, setDarkModeOpen] = useState(false);
    const [lightModeOpen, setLightModeOpen] = useState(false);

    const [darkThemes, setDarkThemes] = useState([
        { label: 'Dark', value: '#191919' },
        { label: 'Oxford Blue', value: '#0A162C' },
        { label: 'Dark Red', value: '#2B0F0F' },
        { label: 'Dark Green', value: '#0F2B0F' },
        { label: 'Dark Yellow', value: '#2B2B0F' },
        { label: 'Dark Purple', value: '#2B0F2B' },
        { label: 'Dark Orange', value: '#2B1C0F' },
        { label: 'Dark Pink', value: '#2B0F1C' },
        { label: 'Dark Cyan', value: '#0F2B2B' },
        { label: 'Raisin Black', value: '#1F2022' }
    ]);

    const [lightThemes, setLightThemes] = useState([
        { label: 'Light', value: '#FFFFFF' },
        { label: 'Azure (Web)', value: '#DDECEF' },
        { label: 'Desert Sand', value: '#F8D5C1' },
        { label: 'Pale Robin Egg Blue', value: '#96DFCE' },
        { label: 'Straw', value: '#F1EB86' },
        { label: 'Mimi Pink', value: '#EDD1E0' },
        { label: 'Antique White', value: '#F8ECD7' },
        { label: 'Misty Rose', value: '#F0DEDE' },
        { label: 'Light Cyan', value: '#E0FFFF' },
        { label: 'Anti-Flash White', value: '#F1EFF0' }
    ]);

    const renderBorderSwitch = () => {
        return (
            <View style={styles.borderSwitchContainer}>
                <Text>
                    Border
                </Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    onValueChange={() => setBorder(!border)}
                    value={border}
                />
            </View>
        )
    }

    const renderDarkModeSwitch = () => {
        return (
            <View style={styles.darkSwitchContainer}>
                <Text>
                    Dark Toggle
                </Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    onValueChange={() => setDarkMode(!darkMode)}
                    value={darkMode}
                />
            </View>
        )
    }

    const renderBoldPieceTextSwitch = () => {
        return (
            <View style={styles.boldSwitchContainer}>
                <Text>
                    Bold Piece Text
                </Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    onValueChange={() => setBoldPieceText(!boldPieceText)}
                    value={boldPieceText}
                />
            </View>
        )
    }

    const renderDarkPicker = () => {
        const [selectedValue, setSelectedValue] = useState<string>('option1');
        return (
            <View>
                <DropDownPicker
                    open={darkModeOpen}
                    value={darkModeBackground}
                    items={darkThemes}
                    setOpen={setDarkModeOpen}
                    setValue={setDarkModeBackground}
                    setItems={setDarkThemes}
                    placeholder="Select a Dark Theme"
                    style={styles.darkAndLightDropDown}
                    listMode="MODAL"
                    modalProps={{
                        animationType: "fade"
                    }}
                    modalContentContainerStyle={{
                        backgroundColor: "white"
                    }}
                />
            </View>
        )
    }
    const renderLightPicker = () => {
        return (
            <View>
                <DropDownPicker
                    open={lightModeOpen}
                    value={lightModeBackground}
                    items={lightThemes}
                    setOpen={setLightModeOpen}
                    setValue={setLightModeBackground}
                    setItems={setLightThemes}
                    placeholder="Select a Light Theme"
                    style={styles.darkAndLightDropDown}
                    listMode="MODAL"
                    modalProps={{
                        animationType: "slide"
                    }}
                    modalContentContainerStyle={{
                        backgroundColor: "white"
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.UIControlsContainer}>
            <View style={styles.UITopControlsContainer}>
                {renderBorderSwitch()}
                {renderDarkModeSwitch()}
                {renderBoldPieceTextSwitch()}
            </View>
            <View>
                <Text style={styles.UIMiddleControlsTitle}>Theme Colors</Text>
                <View style={styles.UIMiddleControlsContainer}>
                    {renderLightPicker()}
                    {renderDarkPicker()}
                </View>
            </View>
        </View>
    )
}


