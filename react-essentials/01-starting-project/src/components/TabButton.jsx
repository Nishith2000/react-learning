export default function TabButton({ children, isSelected, ...restProps }) {
    return (
        <li>
            <button className = {isSelected ? "active" : undefined} {...restProps}>
                {children}
            </button>
        </li>
    );
}