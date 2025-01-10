import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RubricForm } from './RubricForm';

describe('RubricForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    render(<RubricForm onSubmit={mockOnSubmit} isLoading={false} />);
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/exam board/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/grade boundaries/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/criteria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/total marks/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /upload/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/exam board is required/i)).toBeInTheDocument();
  });

  it('disables submit button when loading', () => {
    render(<RubricForm onSubmit={mockOnSubmit} isLoading={true} />);
    const submitButton = screen.getByRole('button', { name: /uploading/i });
    expect(submitButton).toBeDisabled();
  });
});