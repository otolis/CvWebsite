import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock animation hooks
vi.mock('./hooks/useScrollAnimations', () => ({
    useScrollAnimations: () => ({ current: null })
}));

vi.mock('./hooks/usePageAnimations', () => ({
    usePageAnimations: () => ({ handleNameHover: vi.fn() })
}));

describe('App Component', () => {
    it('renders the header with name', () => {
        render(<App />);
        expect(screen.getByText(/Apostolos Lagonikas/i)).toBeInTheDocument();
    });

    it('renders the Projects section', () => {
        render(<App />);
        expect(screen.getByText(/Projects \(Click to View\)/i)).toBeInTheDocument();
    });
});
