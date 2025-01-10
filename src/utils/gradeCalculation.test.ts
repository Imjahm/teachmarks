import { describe, it, expect } from 'vitest';
import { calculateGrade } from './gradeCalculation';

describe('calculateGrade', () => {
  const gradeBoundaries = {
    'A*': 90,
    'A': 80,
    'B': 70,
    'C': 60,
    'D': 50,
    'E': 40,
    'F': 0
  };

  it('should return correct grade for marks above highest boundary', () => {
    expect(calculateGrade(95, gradeBoundaries)).toBe('A*');
  });

  it('should return correct grade for marks exactly on boundary', () => {
    expect(calculateGrade(80, gradeBoundaries)).toBe('A');
  });

  it('should return correct grade for marks between boundaries', () => {
    expect(calculateGrade(75, gradeBoundaries)).toBe('B');
  });

  it('should return F for marks below all boundaries', () => {
    expect(calculateGrade(35, gradeBoundaries)).toBe('F');
  });

  it('should handle edge case of 0 marks', () => {
    expect(calculateGrade(0, gradeBoundaries)).toBe('F');
  });
});