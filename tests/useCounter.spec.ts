import { renderHook, act } from '@testing-library/react';
import useCounter from '../src/hooks/features/homepage/useCounter';
import { describe, it, expect } from 'vitest';

describe('useCounter', () => {
  it('should initialize with count 0 and val 1', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val (default 1)', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should increment count multiple times', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(3);
  });

  it('should update val and increment by new val', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(5);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
  });

  it('should increment by custom val multiple times', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(3);
    });

    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(6);
  });

  it('should handle zero increment value', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(0);
    });

    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(0);
  });

  it('should change val without affecting current count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment(); // count becomes 1
      result.current.setVal(10);
    });
    
    expect(result.current.count).toBe(1);
    expect(result.current.val).toBe(10);
  });
});
