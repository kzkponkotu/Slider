function getParameterDefinitions() {
    return [
        { name: 'slider_length', type: 'float', initial: 50, min: 0, max: 100, step: 0.1, caption: 'スライダーの長さ' },
        { name: 'slider_height', type: 'float', initial: 15, min: 0, max: 100, step: 0.1, caption: 'スライダーの高さ' },
        { name: 'slider_wall', type: 'float', initial: 4, min: 0, max: 100, step: 0.1, caption: '外壁の厚さ' },
        { name: 'slider_stopper', type: 'float', initial: 3, min: 0, max: 100, step: 0.1, caption: 'ストッパーの厚さ' },
        { name: 'mizo_haba', type: 'float', initial: 4, min: 0, max: 100, step: 0.1, caption: 'レールの厚さ' },
        { name: 'slider_mizo', type: 'float', initial: 5, min: 0, max: 100, step: 0.1, caption: 'レールの高さ' },
        { name: 'kankaku', type: 'float', initial: 10, min: 0, max: 100, step: 0.1, caption: '中央の穴の幅' },
        { name: 'slider_sukima', type: 'float', initial: 0.5, min: 0, max: 100, step: 0.1, caption: 'スライダーとレールのすきま' },
        { name: 'slider_ookisa', type: 'float', initial: 10, min: 0, max: 100, step: 0.1, caption: '動かすスライダーの長さ' },
        { name: 'slider_iti', type: 'float', initial: 5, min: 0, max: 100, step: 0.1, caption: '動かすスライダーの位置' }
    ];
}

function main(p) {
   if(p.slider_ookisa > p.slider_length)p.slider_ookisa = p.slider_length;
   p.slider_wall += 4;
   p.slider_wall += p.mizo_haba;
   p.kankaku = (p.kankaku*-1) + 4;
   p.mizo_haba = p.mizo_haba + 4;
   p.slider_sukima = (p.slider_sukima+1.0)*-1;
   var o = [];
    o.push(
        difference(
            translate([p.slider_iti, (10 - ((p.kankaku-(p.mizo_haba*0.5 + p.slider_sukima)) - 4))*0.5, 0],cube({size: [p.slider_ookisa, ((p.kankaku-(p.mizo_haba*0.5 + p.slider_sukima)) - 4), p.slider_height]})),
            translate([0,((p.slider_sukima+1.0)*0.5) + (10 - ((p.kankaku-(p.mizo_haba*0.5 + p.slider_sukima)) - 4))*0.5 - (p.mizo_haba-4)*0.5,(p.slider_sukima+1.0) + (p.slider_height-p.slider_mizo)*0.5],cube({size: [p.slider_length,(p.mizo_haba+((p.slider_sukima+1.0)*-1)-4)*0.5,p.slider_mizo+(p.slider_sukima+1.0)*-2]})),
            translate([0,((p.mizo_haba+((p.slider_sukima+1.0)*-1)-4)*0.5) + ((p.kankaku-(p.mizo_haba*0.5 + p.slider_sukima)) - 4) + ((p.slider_sukima+1.0)*0.5) + (10 - ((p.kankaku-(p.mizo_haba*0.5 + p.slider_sukima)) - 4))*0.5 - (p.mizo_haba-4)*0.5,(((p.slider_sukima+1.0))) + (p.slider_height-p.slider_mizo)*0.5],cube({size: [p.slider_length,(p.mizo_haba+((p.slider_sukima+1.0)*-1)-4)*0.5,p.slider_mizo+((p.slider_sukima+1.0)*-2)]}))
        ),
        difference(
            //スライダーの型
            translate([0, (10 - (p.slider_wall-p.kankaku))*0.5, 0],cube({size: [p.slider_length, (p.slider_wall-p.kankaku), p.slider_height]})),
            //中央の穴
            translate([0, (10 - (p.kankaku - 4))*0.5, 0],cube({size: [p.slider_length, (p.kankaku - 4), p.slider_height]})),
            //上部の穴
            translate([p.slider_stopper,(10 - (p.mizo_haba-p.kankaku))*0.5, p.slider_height-((p.slider_height - p.slider_mizo)*0.5)],cube({size: [p.slider_length-(p.slider_stopper*2), (p.mizo_haba-p.kankaku),(p.slider_height - p.slider_mizo)*0.5]})),
            //下部の穴
            translate([p.slider_stopper, (10 - (p.mizo_haba-p.kankaku))*0.5, 0],cube({size: [p.slider_length-(p.slider_stopper*2), (p.mizo_haba-p.kankaku),(p.slider_height - p.slider_mizo)*0.5]}))
        )
    );
    return union(o)
}
