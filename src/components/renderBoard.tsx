import React from "react"
import { useEffect, useState } from "react"
import { View, Pressable, Text } from "react-native"
import { styles } from "../views/Home/styles"
import Cell , 
{ moves, color, Pawn, Rook, Knight, Bishop } from "../BoardParts"

interface RenderBoardProps {
    darkMode      : boolean
    border        : boolean
    boldPieceText : boolean
    unselectedHex : String
    selectedHex   : String
    setPieceMove  : React.Dispatch<React.SetStateAction<moves[][]>>
}
export default function RenderBoard ({
    darkMode     , 
    border       , 
    boldPieceText, 
    unselectedHex, 
    selectedHex  , 
    setPieceMove , 
}: RenderBoardProps // Props
) {

    const [board, setBoard] = useState<Cell[][]>([]);
    const row = 8;
    const col = 8;
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

    const boardPressed = (
        boardObject  : Cell,
        setPieceMove : React.Dispatch<React.SetStateAction<moves[][]>>
    ) => {
        setPieceMove([]);
        if (boardObject.piece === null) {
            return;
        }
        console.log(boardObject.piece.name);
        setPieceMove(boardObject.piece.moves.specialMoveLogic().map(
            (row) => [...row]
        ));
    }
    return (
        board.map((row, i) => {
            return (
                <View key={`board-row-${i}`} style={{ flexDirection: 'row' }} >
                    {row.map((_, j) => {
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
                                onPress={() => {
                                    const boardObject : Cell = board[i][j];
                                    boardPressed(boardObject, setPieceMove);
                                }}
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
