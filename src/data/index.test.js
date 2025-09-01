import { describe, it, expect, beforeEach } from 'vitest';
import { groupNumber, createEventId } from './index.js';

describe('groupNumber', () => {
  it('formats integer with grouping and no unnecessary decimals', () => {
    expect(groupNumber(1234567)).toBe('1,234,567');
  });

  it('rounds and formats decimals correctly', () => {
    expect(groupNumber(1234.567)).toBe('1,234.57');
    expect(groupNumber(1234.564)).toBe('1,234.56');
  });

  it('handles negative numbers', () => {
    expect(groupNumber(-9876.543)).toBe('-9,876.54');
  });
});

describe('createEventId', () => {
  beforeEach(() => {
    // The counter is module-scoped; importing twice wouldn't reset it.
    // So we just ensure sequential calls produce increasing string ids.
  });

  it('returns increasing string ids on each call', () => {
    const id1 = createEventId();
    const id2 = createEventId();
    const id3 = createEventId();

    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
    expect(typeof id3).toBe('string');

    expect(Number(id2)).toBe(Number(id1) + 1);
    expect(Number(id3)).toBe(Number(id2) + 1);
  });
});
