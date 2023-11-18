import classNames from 'classnames';

export const cx = classNames;

export const setOnLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}