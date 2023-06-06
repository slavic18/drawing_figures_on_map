import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import L from 'leaflet';
import MapFigureComposer from '../../../components/MapFigureComposer';

// Mock the Leaflet map instance
jest.mock('leaflet', () => {
    return {
        __esModule: true,
        default: {
            on: jest.fn(),
            off: jest.fn(),
            removeLayer: jest.fn(),
            addTo: jest.fn(),
            setLatLngs: jest.fn(),
        },
    };
});

describe('MapFigureComposer', () => {
    let leafletMapInstance;

    beforeEach(() => {
        leafletMapInstance = L;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component correctly', () => {
        render(<MapFigureComposer leafletMapIntance={leafletMapInstance} onFinishDrawingFigure={jest.fn()} />);

        // Assert that the component renders without errors
        expect(screen.getByText('Draw')).toBeInTheDocument();
        expect(screen.getByText('Stop drawing')).toBeInTheDocument();
    });

    it('should start drawing figure when "Draw" button is clicked', () => {

    });

    it('should finish drawing figure when "Stop drawing" button is clicked', () => {

    });

});





