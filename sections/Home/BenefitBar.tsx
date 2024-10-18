import Icon from "../../components/ui/Icon";

interface BenefitBarProps {
    items: [{icon: string; text: string}]
}

export default function BenefitBar({ items }: BenefitBarProps) {
   return ( 
       <div>
            {items && 
                items.map(item => (
                    <div class="flex gap-[10px]">
                        <Icon id={item.icon} width={30} height={30} class="object-contain"/>
                        <p></p>
                    </div>
                ))
            }
       </div>
   );
}