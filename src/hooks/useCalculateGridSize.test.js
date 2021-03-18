import React from 'react'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import useCalculatedGridSize from './useCalculatedGridSize'

const fireResize = (width, height) => {
    window.innerWidth = width
    window.innerHeight = height
    act(() => {
        window.dispatchEvent(new Event('resize'))
    })

}

const TestComponent = ({maxWidth, padding}) => {
    const {numCols, numRows, sizeItem} = useCalculatedGridSize(maxWidth, padding)
    return (
        <div>
            <span>{`${numCols}`}</span>
            <span>{`${numRows}`}</span>
            <span>{`${sizeItem}`}</span>
        </div>
    )
}

test('useCalculateGridSize should throw an error when maxWidth param is not a number', () => {
    render(<TestComponent maxWidth='a' />);
})

test('useCalculateGridSize listen to window resize and calculate grid row and cols', () => {
    const { container, rerender } = render(<TestComponent />)
    const numColsSpan = container.firstChild.children[0]
    const numRowsSpan = container.firstChild.children[1]
    const sizeItemSpan = container.firstChild.children[2]

    fireResize(320, 568)
    rerender(<TestComponent />)
    expect(numColsSpan.textContent).toBe('2')
    expect(numRowsSpan.textContent).toBe('4')
    expect(sizeItemSpan.textContent).toBe('132')

    fireResize(540, 720)
    rerender(<TestComponent />)
    expect(numColsSpan.textContent).toBe('3')
    expect(numRowsSpan.textContent).toBe('5')
    expect(sizeItemSpan.textContent).toBe('134.4')

    fireResize(768, 1024)
    rerender(<TestComponent />)
    expect(numColsSpan.textContent).toBe('4')
    expect(numRowsSpan.textContent).toBe('6')
    expect(sizeItemSpan.textContent).toBe('161.33')

    fireResize(1024, 1366)
    rerender(<TestComponent />)
    expect(numColsSpan.textContent).toBe('5')
    expect(numRowsSpan.textContent).toBe('7')
    expect(sizeItemSpan.textContent).toBe('186')

    fireResize(1210, 1450)
    rerender(<TestComponent />)
    expect(numColsSpan.textContent).toBe('6')
    expect(numRowsSpan.textContent).toBe('8')
    expect(sizeItemSpan.textContent).toBe('172.25')


})