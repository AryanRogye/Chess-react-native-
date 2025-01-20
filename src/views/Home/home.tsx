import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { moves } from '../../BoardParts';
import  { styles } from './styles';
// Components
import RenderBoard from '../../components/renderBoard';
import RenderBoardPieceMoves from '../../components/renderBoardPieceMoves';
import RenderUIControls from '../../components/renderUIControls';

export default function Home() {
    // 2D Array of cells
    const [selectedHex, setSelectedHex] = useState<string>('#999999');
    const [unselectedHex, setUnselectedHex] = useState<string>('#ffffff');

    // Piece Move
    const [pieceMove, setPieceMove] = useState<moves[][]>([]);

    // Board Settings Which You Can Edit On Screen
    const [border, setBorder] = useState<boolean>(false);
    const [darkModeToggle, setDarkMode] = useState<boolean>(false);
    const [darkModeBackground , setDarkModeBackground] = useState<string>('#191919');
    const [lightModeBackground, setLightModeBackground] = useState<string>('#ffffff');

    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

    // This will be text for now later will be image
    const [boldPieceText, setBoldPieceText] = useState<boolean>(false);
    
    useEffect(() => {
        if (darkModeToggle) {
            setBackgroundColor(`${darkModeBackground}`);
        } else {
            setBackgroundColor(`${lightModeBackground}`);
        }
    }, [darkModeToggle]);
    /****************************************************************
     * this function is used to change the darkModeToggle state
     * basically if the background color is different than either
     * the darkModeBackground or lightModeBackground then it will
     * change the darkModeToggle state to what it is
     ************************************************************/
    const prevDarkModeBackground = useRef(darkModeBackground);
    const prevLightModeBackground = useRef(lightModeBackground);
    useEffect(() => {
        // Dark Mode Changed
        if (prevDarkModeBackground.current !== darkModeBackground) {
            setDarkMode(true);
            setBackgroundColor(`${darkModeBackground}`);
            prevDarkModeBackground.current = darkModeBackground;
        }
        // Light Mode Changed
        if (prevLightModeBackground.current !== lightModeBackground) {
            setDarkMode(false);
            setBackgroundColor(`${lightModeBackground}`);
            prevLightModeBackground.current = lightModeBackground;
        }
    }, [darkModeBackground, lightModeBackground])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: `${backgroundColor}`}]}>
            <View>
                <Text style={styles.title}>
                    Home
                </Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ height: 100 }}/>
                <View style={styles.boardContainer}>
                    <RenderBoard
                        darkMode={darkModeToggle}
                        border={border}
                        boldPieceText={boldPieceText}
                        unselectedHex={unselectedHex}
                        selectedHex={selectedHex}
                        setPieceMove={setPieceMove}
                    />
                </View>
                <View style={styles.moveContainer}>
                    <RenderBoardPieceMoves
                        pieceMove={pieceMove}
                    />
                </View>
                <View style={styles.boardControllerContainer}>
                    <RenderUIControls
                        border={border}
                        setBorder={setBorder}
                        darkMode={darkModeToggle}
                        setDarkMode={setDarkMode}
                        boldPieceText={boldPieceText}
                        setBoldPieceText={setBoldPieceText}
                        darkModeBackground={darkModeBackground}
                        lightModeBackground={lightModeBackground}
                        setDarkModeBackground={setDarkModeBackground}
                        setLightModeBackground={setLightModeBackground}
                        backgroundColor={backgroundColor}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
