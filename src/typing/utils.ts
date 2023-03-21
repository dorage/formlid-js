/**
 * generic으로 주어진 object의 key 값을 반환하는 유틸리티 타입
 */
export type UKey<TObject extends object> = keyof TObject;

/**
 * generic으로 주어진 object의 key 값 배열의 타입을 반환하는 유틸리티 타입
 */
export type UKeys<TObject extends object> = Array<UKey<TObject>>;
