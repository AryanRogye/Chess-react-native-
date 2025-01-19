
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import Cell from '../BoardParts';
import { color } from '../BoardParts';
import { Pawn } from '../BoardParts';
import { Rook } from '../BoardParts';
import { Bishop } from '../BoardParts';
import { Knight } from '../BoardParts';
import { moves } from '../BoardParts';

export default function Home() {
    // 2D Array of cells
    const [board, setBoard] = useState<Cell[][]>([]);
    const [selectedHex, setSelectedHex] = useState<String>('#999999');
    const [unselectedHex, setUnselectedHex] = useState<String>('#ffffff');

    // Piece Move
    const [pieceMove, setPieceMove] = useState<moves[][]>([]);

    // Board Settings Which You Can Edit On Screen
    const [border, setBorder] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<String>('#ffffff');

    // This will be text for now later will be image
    const [boldPieceText, setBoldPieceText] = useState<boolean>(false);

    const row = 8;
    const col = 8;

    useEffect(() => {
        if (darkMode) {
            setBackgroundColor('#191919');
        } else {
            setBackgroundColor('#ffffff');
        }
    }, [darkMode]);

    useEffect(() => {
        const initArray = () => {
            const newBoard: Cell[][] = [];
            // Fill Up With Empty Cells
            for (let i = 0; i < row; i++) {
                // Init a Temp Array
                const temp: Cell[] = [];
                for (let j = 0; j < col; j++) {
                    // Push All Values as Null
                    temp.push(new Cell(null, color.black));
                }
                // Push Temp Array to Board
                newBoard.push(temp);
            }
            // Setting Up Pawns First
            // Pawns Go in the 2nd and 7th row
            for (let i = 0; i < col; i++) {
                // Create Pawn Object
                const pawn = new Pawn();
                newBoard[1][i] = new Cell(pawn, color.black);
                newBoard[6][i] = new Cell(pawn, color.white);
            }
            // Rooks Go in the 1st and 8th col of the 1st and 8th row
            newBoard[0][0] = new Cell(new Rook(), color.black);
            newBoard[0][7] = new Cell(new Rook(), color.black);
            newBoard[7][0] = new Cell(new Rook(), color.white);
            newBoard[7][7] = new Cell(new Rook(), color.white);
            // Bishops Go in the 1st and 8th col of the 1st and 8th row
            newBoard[0][2] = new Cell(new Bishop(), color.black);
            newBoard[0][5] = new Cell(new Bishop(), color.black);
            newBoard[7][2] = new Cell(new Bishop(), color.white);
            newBoard[7][5] = new Cell(new Bishop(), color.white);
            // Knights Go in the 1st and 8th col of the 1st and 8th row
            newBoard[0][1] = new Cell(new Knight(), color.black);
            newBoard[0][6] = new Cell(new Knight(), color.black);
            newBoard[7][1] = new Cell(new Knight(), color.white);
            newBoard[7][6] = new Cell(new Knight(), color.white);

            setBoard(newBoard);
        }
        initArray();
    }, []);
    const boardPressed = (boardObject : Cell) => {
        setPieceMove([]);
        if (boardObject.piece === null) {
            return;
        }
        console.log(boardObject.piece.name);
        setPieceMove(boardObject.piece.moves.specialMoveLogic().map(
            (row) => [...row]
        ));
    }
    const renderBoardPieceMoves = () => {
        return (
            pieceMove.map((row, i) => {
                return (
                    <View key={`moves-row-${i}`} style={{ flexDirection: 'row' }}>
                        {row.map((col, j) => {
                            return (
                                <View key={`moves-col-${i}-${j}`}>
                                    <Text>
                                        {moves[pieceMove[i][j]]}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                )
            })
        )
    }

    const renderBoard = () => {
        return (
            board.map((row, i) => {
                return (
                    <View key={`board-row-${i}`} style={{ flexDirection: 'row' }} >
                        {row.map((col, j) => {
                            return (
                                <Pressable
                                    key={`board-col-${i}-${j}`}
                                    style={({ pressed }) => [
                                        styles.touchable, pressed
                                        ?   {
                                        backgroundColor: darkMode ? `${unselectedHex}` : `${selectedHex}`,
                                        borderWidth: border ? 1 : 0,
                                        } : {
                                        backgroundColor: darkMode ? `${selectedHex}` : `${unselectedHex}`,
                                        borderWidth: border ? 1 : 0,
                                        }
                                    ]}
                                    onPress={() => {boardPressed(board[i][j])}}
                                >
                                    <Text style={{ fontWeight: boldPieceText ? "bold" : "500" }}>
                                        {board[i][j].piece != null ? board[i][j].piece.name[0] : "-"}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                )
            })
        )
    }
    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: `${backgroundColor}`
        }]}>
            <View>
                <Text style={styles.title}>
                    Home
                </Text>
            </View>
            <View style={{ height: 100 }}/>
            <View style={styles.boardContainer}>
                {renderBoard()}
            </View>
            <View style={styles.moveContainer}>
                {renderBoardPieceMoves()}
            </View>
            <View style={styles.boardControllerContainer}>
                <View style={{
                    flexDirection: "row",
                    // Add Space Between
                    justifyContent: 'space-between',
                    marginRight: 20,
                    marginLeft: 20,
                }}>
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
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    boardContainer: {
        alignItems: 'center',
        borderWidth: 1,
    },
    touchable: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boardControllerContainer: {
        flex: 1,
        borderWidth: 1,
    },
    borderSwitchContainer: {
        borderWidth: 1,
        marginLeft: 20,
    },
    moveContainer: {
        borderWidth: 1,
    },
    darkSwitchContainer: {
        borderWidth: 1,
    },
    boldSwitchContainer: {
        borderWidth: 1,
        marginRight: 20,
    }
});
