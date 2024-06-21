import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';

const DraggableItem:any = ({ children, index, moveElement }: { children: any, index: number, moveElement:any, className: string }) => {

    const ref:any = useRef(null);

    const [, drag] = useDrag({
        type: "item",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    
    const [, drop] = useDrop({

        accept: 'item',

        hover(item:any, monitor) {

            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset:any = monitor.getClientOffset();
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

export default DraggableItem;