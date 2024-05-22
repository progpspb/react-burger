import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const DraggableItem = ({ children, index, moveElement, className }) => {

    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "item",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    
    const [, drop] = useDrop({

        accept: 'item',

        hover(item, monitor) {

            if (!ref.current) return;
            
            const dragIndex = item.dragIndex;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

            moveElement(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });  
    
    drag(drop(ref));
   
    
    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    moveElement: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default DraggableItem;