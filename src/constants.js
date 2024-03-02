  export const TURNS = {
    square: [
      { shape: 'square', color: '#33A233', size: 'big' },
      { shape: 'square', color: '#33A233', size: 'big' },
      { shape: 'square', color: '#33A233', size: 'medium' },
      { shape: 'square', color: '#33A233', size: 'medium' },
      { shape: 'square', color: '#33A233', size: 'small' },
      { shape: 'square', color: '#33A233', size: 'small' },
    ],
    circle: [
      { shape: 'circle', color: '#2D5FD2', size: 'big' },
      { shape: 'circle', color: '#2D5FD2', size: 'big' },
      { shape: 'circle', color: '#2D5FD2', size: 'medium' },
      { shape: 'circle', color: '#2D5FD2', size: 'medium' },
      { shape: 'circle', color: '#2D5FD2', size: 'small' },
      { shape: 'circle', color: '#2D5FD2', size: 'small' },
    ]
  }

  export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
