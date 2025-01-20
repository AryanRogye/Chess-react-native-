import React from 'react';
import { View, Text } from 'react-native';
import { moves } from '../BoardParts';

interface RenderBoardPieceMovesProps {
    pieceMove: moves[][];
}
export default function RenderBoardPieceMoves({
    pieceMove,
}: RenderBoardPieceMovesProps)
{
    return (
        pieceMove.map((row : any, i : number) => {
            return (
                <View key={`moves-row-${i}`} style={{ flexDirection: 'row' }}>
                    {row.map((_ : any, j : number) => {
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
