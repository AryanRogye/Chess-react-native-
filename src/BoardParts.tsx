import React from "react";

// TODO : CHANGE THE MOVES ENUM REMOVE KILL MOVES AND
// ADD canKill boolean

export enum moves {
    up,
    upKill,
    down,
    downKill,
    left,
    leftKill,
    right,
    rightKill,
    upLeft,
    upLeftKill,
    upRight,
    upRightKill,
    downLeft,
    downLeftKill,
    downRight,
    downRightKill,
}

interface Move {
    // -1 for infinite
    steps : number;
    requiresClearPath: boolean;
    // Custom logic for special moves
    specialMoveLogic?: () => moves[][];
}


class Piece {
    name: string;
    moves: Move;

    constructor(
        name  : string,
        moves : Move,
    ) {
        this.name = name;
        this.moves = moves;
    }
}

export class Pawn extends Piece {
    constructor() {
        const moveFunction : Move = {
            steps: 2,
            requiresClearPath: true,
            specialMoveLogic: () => {
                return [[moves.up], [moves.up, moves.up]];
            }
        }
        super("Pawn", moveFunction);
    }
}

export class Rook extends Piece {
    constructor() {
        const moveFunction : Move = {
            steps: -1,
            requiresClearPath: true,
            specialMoveLogic: () => {
                return [
                    [moves.up], [moves.upKill],
                    [moves.down], [moves.downKill],
                    [moves.left], [moves.leftKill],
                    [moves.right] , [moves.rightKill]
                ];
            }
        }
        super("Rook", moveFunction);
    }
}

export class Bishop extends Piece {
    constructor() {
        const moveFunction : Move = {
            steps: -1,
            requiresClearPath: true,
            specialMoveLogic: () => {
                return [
                    [moves.upRight], [moves.upRightKill],
                    [moves.upLeft], [moves.upLeftKill],
                    [moves.downRight], [moves.downRightKill],
                    [moves.downLeft], [moves.downLeftKill]
                ];
            }
        };
        super("Bishop", moveFunction);
    }
}

export class Knight extends Piece {
    constructor() {
        const moveFunction : Move = {
            steps: 2,
            requiresClearPath: false,
            specialMoveLogic: () => {
                return [
                    // up 2 moves then left or right
                    [moves.up, moves.up, moves.upRightKill],
                    [moves.up, moves.up, moves.upLeftKill],
                    // down 2 moves then left or right
                    [moves.down, moves.down, moves.downRightKill],
                    [moves.down, moves.down, moves.downLeftKill],
                    // up 1 moves then left or right 2 moves
                    [moves.up, moves.left, moves.upLeftKill],
                    [moves.up, moves.left, moves.downLeftKill],
                    // down 1 moves then left or right 2 moves
                    [moves.down, moves.right, moves.upRightKill],
                    [moves.down, moves.right, moves.downRightKill],
                ];
            }
        };
        super("Knight", moveFunction);
    }
}




export enum color { black, white }

export default class Cell {
    piece: Piece | null;
    color: color;

    constructor(piece: Piece | null, color: color) {
        this.piece = piece;
        this.color = color;
    }
}


