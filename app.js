const sections = [
["VERIFICAÇÕES DE SEGURANÇA EM OBRA", [
"Organização Geral do Estaleiro",
"Caminhos de Circulação",
"Redes Técnicas Provisórias",
"Emergência",
"Sinalização",
"Parque de Pré-Fabrico de Armaduras de Ferro",
"Equipamentos de Proteção Coletiva",
"Equipamentos de Proteção Individual",
"Equipamentos de Trabalho",
"Trabalhos em Altura",
"Andaimes",
"Plataformas de Trabalho",
"Escadas e Escadotes",
"Escavações e Movimentação de Terras",
"Organização e Limpeza das Frentes de Obra"
]],
["ITENS OPCIONAIS", [
"Vedação da Obra",
"Vitrine de Obra",
"Instalações Sociais - Sanitários, Vestiários e Balneários",
"Instalações Sociais - Copas e Refeitórios",
"Ferramentaria",
"Parque de Materiais",
"Parque de Resíduos",
"Substâncias Químicas",
"Movimentação Mecânica de Cargas",
"Bacia de limpeza de betão"
]]
];
const DEFAULT_RISK_OPTIONS = ["Queda em altura", "Queda em nível diferente", "Queda ao mesmo nível", "Soterramento", "Risco elétrico", "Contacto elétrico direto", "Contacto elétrico indireto", "Corte / golpe / perfuração", "Queda de objetos", "Entalamento ou esmagamento", "Atropelamento", "Capotamento", "Choque contra objetos", "Projeção de objetos ou partículas", "Colapso de estrutura", "Marcha sobre objetos", "Sobrecarga e sobreesforço", "Postura de trabalho inadequada", "Ruído", "Vibrações", "Iluminação deficiente", "Ambiente térmico", "Radiações não ionizantes", "Radiações ionizantes", "Poeiras", "Líquidos", "Gases", "Vapores", "Fumos", "Atmosfera pobre em oxigénio", "Substâncias químicas", "Vírus", "Parasitas", "Fungos", "Bactérias", "Incêndio", "Combustíveis sólidos", "Combustíveis líquidos", "Combustíveis gasosos", "Origem elétrica", "Explosão", "Stress", "Sobrecarga de trabalho", "Outro"];
let riskOptions = [...DEFAULT_RISK_OPTIONS];
const RISK_CATEGORIES_PATH = "storage/categories/risk-categories.json";
const responsibleOptions = ["Encarregado","Técnico de Segurança","Diretor de Obra"];
const deadlineOptions = ["Imediato","1 dia","3 dias","1 semana"];
const riskMap = {"Vedação da Obra": {"category": "Vedação / perímetro", "risk": "Queda em nível diferente", "action": "Regularizar a vedação da obra e garantir a delimitação física adequada do perímetro."}, "Organização Geral do Estaleiro": {"category": "Organização / estaleiro", "risk": "Queda ao mesmo nível", "action": "Proceder à organização geral do estaleiro, removendo materiais, resíduos e obstáculos das zonas de trabalho."}, "Caminhos de Circulação": {"category": "Circulação", "risk": "Queda ao mesmo nível", "action": "Desobstruir e reorganizar os caminhos de circulação, garantindo passagem segura."}, "Vitrine de Obra": {"category": "Documentação / comunicação", "risk": "Outro", "action": "Atualizar e manter a vitrine de obra com a documentação e informação obrigatória visível."}, "Redes Técnicas Provisórias": {"category": "Redes provisórias", "risk": "Risco elétrico", "action": "Organizar e proteger as redes técnicas provisórias, eliminando situações de exposição ou passagem insegura."}, "Emergência": {"category": "Emergência", "risk": "Outro", "action": "Garantir meios, acessos e informação de emergência disponíveis, visíveis e operacionais."}, "Sinalização": {"category": "Sinalização", "risk": "Queda em nível diferente", "action": "Repor, reforçar ou corrigir a sinalização de segurança em falta ou insuficiente."}, "Instalações Sociais - Sanitários, Vestiários e Balneários": {"category": "Instalações sociais", "risk": "Outro", "action": "Garantir condições adequadas de limpeza, organização e utilização nas instalações sociais."}, "Instalações Sociais - Copas e Refeitórios": {"category": "Instalações sociais", "risk": "Outro", "action": "Garantir condições adequadas de limpeza, higiene e organização nas copas e refeitórios."}, "Ferramentaria": {"category": "Ferramentaria", "risk": "Corte / golpe / perfuração", "action": "Organizar a ferramentaria e garantir que ferramentas e utensílios se encontram em condições de segurança."}, "Parque de Materiais": {"category": "Armazenamento", "risk": "Queda ao mesmo nível", "action": "Organizar o parque de materiais, garantindo armazenamento estável e circulação livre."}, "Parque de Resíduos": {"category": "Resíduos", "risk": "Queda ao mesmo nível", "action": "Recolher, separar e acondicionar os resíduos em local definido."}, "Parque de Pré-Fabrico de Armaduras de Ferro": {"category": "Armaduras / pré-fabrico", "risk": "Corte / golpe / perfuração", "action": "Organizar o parque de pré-fabrico e proteger extremidades ou zonas com risco de corte/perfuração."}, "Substâncias Químicas": {"category": "Substâncias químicas", "risk": "Substâncias químicas", "action": "Armazenar e identificar as substâncias químicas em local adequado, com contenção e informação de segurança."}, "Equipamentos de Proteção Coletiva": {"category": "EPC", "risk": "Queda em altura", "action": "Repor ou corrigir os equipamentos de proteção coletiva antes da continuidade dos trabalhos."}, "Equipamentos de Proteção Individual": {"category": "EPI", "risk": "Outro", "action": "Garantir a utilização dos equipamentos de proteção individual obrigatórios."}, "Equipamentos de Trabalho": {"category": "Equipamentos de trabalho", "risk": "Outro", "action": "Regularizar ou retirar de serviço os equipamentos sem condições de segurança."}, "Trabalhos em Altura": {"category": "Trabalhos em altura", "risk": "Queda em altura", "action": "Assegurar proteção coletiva ou individual adequada antes da continuidade dos trabalhos em altura."}, "Andaimes": {"category": "Andaimes", "risk": "Queda em altura", "action": "Regularizar o andaime, garantindo plataforma, acessos, rodapés e proteções adequadas."}, "Plataformas de Trabalho": {"category": "Plataformas de trabalho", "risk": "Queda em altura", "action": "Garantir estabilidade, proteção e condições de utilização das plataformas de trabalho."}, "Escadas e Escadotes": {"category": "Escadas / escadotes", "risk": "Queda em altura", "action": "Corrigir ou substituir escadas e escadotes sem condições de segurança e estabilidade."}, "Escavações e Movimentação de Terras": {"category": "Escavações", "risk": "Soterramento", "action": "Delimitar, proteger e estabilizar escavações e zonas de movimentação de terras."}, "Movimentação Mecânica de Cargas": {"category": "Movimentação de cargas", "risk": "Queda de objetos", "action": "Garantir condições de segurança na movimentação mecânica de cargas, incluindo zona de exclusão e meios adequados."}, "Bacia de limpeza de betão": {"category": "Ambiente / betão", "risk": "Líquidos", "action": "Garantir bacia de limpeza de betão em condições adequadas, evitando escorrências e deposição indevida."}, "Organização e Limpeza das Frentes de Obra": {"category": "Organização / limpeza", "risk": "Queda ao mesmo nível", "action": "Proceder à limpeza e organização das frentes de obra, removendo resíduos, materiais e obstáculos."}};
const searchAliases = {"Vedação da Obra": "vedação obra perímetro tapume proteção delimitação", "Organização Geral do Estaleiro": "organização geral estaleiro limpeza arrumação resíduos materiais", "Caminhos de Circulação": "caminhos circulação acessos passagens desobstruídos cabos obstáculos", "Vitrine de Obra": "vitrine obra documentação comunicação aviso afixação", "Redes Técnicas Provisórias": "redes técnicas provisórias eletricidade água cabos mangueiras", "Emergência": "emergência extintor evacuação primeiros socorros acesso emergência", "Sinalização": "sinalização placas sinais aviso perigo proibição obrigação", "Instalações Sociais - Sanitários, Vestiários e Balneários": "instalações sociais sanitários vestiários balneários higiene limpeza", "Instalações Sociais - Copas e Refeitórios": "instalações sociais copas refeitórios refeições limpeza higiene", "Ferramentaria": "ferramentaria ferramentas arrumação utensílios equipamentos manuais", "Parque de Materiais": "parque materiais armazenamento paletes stock organização estabilidade", "Parque de Resíduos": "parque resíduos lixo entulho separação acondicionamento contentores", "Parque de Pré-Fabrico de Armaduras de Ferro": "parque pré-fabrico armaduras ferro varões ferros espera", "Substâncias Químicas": "substâncias químicas produtos químicos armazenamento fichas segurança", "Equipamentos de Proteção Coletiva": "epc proteção coletiva guarda corpos aberturas negativos barreiras", "Equipamentos de Proteção Individual": "epi capacete botas colete luvas óculos arnês", "Equipamentos de Trabalho": "equipamentos trabalho máquinas ferramentas betoneira rebarbadora serra", "Trabalhos em Altura": "trabalhos altura queda arnês linha vida cobertura fachada", "Andaimes": "andaimes plataformas rodapé guardas acessos ancoragem", "Plataformas de Trabalho": "plataformas trabalho plataforma elevatória bancada cavalete", "Escadas e Escadotes": "escadas escadotes acesso apoio estabilidade", "Escavações e Movimentação de Terras": "escavações movimentação terras vala talude soterramento", "Movimentação Mecânica de Cargas": "movimentação mecânica cargas grua empilhador elevação carga", "Bacia de limpeza de betão": "bacia limpeza betão lavagem escorrência resíduos betão", "Organização e Limpeza das Frentes de Obra": "organização limpeza frentes obra resíduos entulho materiais"};
const loteEEMap = {"50": "Telhabel", "16": "Telhabel", "17": "Telhabel", "99": "Telhabel", "84": "Wikibuild", "138": "Wikibuild", "144": "Wikibuild", "120": "Netos Seth", "15": "Tecniarte", "18": "Tecniarte", "22": "Tecniarte", "26": "Tecniarte", "54": "Tecniarte", "60": "Tecniarte", "14": "Detailsmind", "45": "Detailsmind", "47": "FCM", "204": "Huitre", "DUNE": "MGPEC"};
const tecLogo = "data:image/png;base64,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";
const costaLogo = "data:image/png;base64,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";
let state = {};
let onlyNOKMode = false;
let activeItemId = "";

function idFor(si,ii){return `s${si}i${ii}`;}
function itemDisplayNumber(si,ii){let n=ii+1;for(let s=0;s<si;s++)n+=sections[s][1].length;return String(n).padStart(2,"0");}
function allItemIds(){const ids=[];sections.forEach((sec,si)=>sec[1].forEach((_,ii)=>ids.push(idFor(si,ii))));return ids;}
function nextItemId(id){const ids=allItemIds();const index=ids.indexOf(id);return index>=0&&index<ids.length-1?ids[index+1]:"";}
function toggleChecklistItem(id,forceOpen){
  const open=typeof forceOpen==="boolean"?forceOpen:activeItemId!==id;
  activeItemId=open?id:"";
  document.querySelectorAll("#checklist .item").forEach(item=>item.classList.toggle("accordionOpen",item.id==="item_"+activeItemId));
  const active=document.getElementById("item_"+activeItemId);
  if(active){const det=active.closest("details");if(det)det.open=true;}
}
function advanceToNextItem(id){
  const next=nextItemId(id);
  if(!next){toggleChecklistItem(id,false);return;}
  toggleChecklistItem(next,true);
  setTimeout(()=>document.getElementById("item_"+next)?.scrollIntoView({behavior:"smooth",block:"center"}),100);
}
function isOptionalSection(si){return si>0;}
function shouldCountItem(si,st){return !isOptionalSection(si)||!!(st&&st.status);}
function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));}
function formatDatePT(v){if(!v)return"____/____/____";if(!/^\d{4}-\d{2}-\d{2}$/.test(String(v)))return String(v);const[y,m,d]=String(v).split("-");return `${d}/${m}/${y}`;}
function localDateValue(now=new Date()){return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;}
function localTimeValue(now=new Date()){return `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;}
function setCurrentVisitDateTime(){const now=new Date();const d=document.getElementById("data");const h=document.getElementById("hora");if(d)d.value=localDateValue(now);if(h)h.value=localTimeValue(now);}
function ensureDateValue(){const d=document.getElementById("data");if(d&&!d.value)d.value=localDateValue();}
function ensureTimeValue(){const h=document.getElementById("hora");if(h&&!h.value)h.value=localTimeValue();}
function refreshTopDate(){const el=document.getElementById("topDate");const dateEl=document.getElementById("data");const horaEl=document.getElementById("hora");if(el&&dateEl)el.textContent=formatDatePT(dateEl.value)+(horaEl&&horaEl.value?" · "+horaEl.value:"");}
function normalizeText(s){s=String(s||"").trim();if(!s)return"";if(s===s.toUpperCase())s=s.toLowerCase().replace(/^./,c=>c.toUpperCase());return s;}
function normalizeSearchText(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();}
function normalizeLote(v){return String(v||"").trim().toUpperCase().replace(/^LOTE\s*/i,"").replace(/^L\s*/i,"");}
function normalizeRiskList(values){
  if(!Array.isArray(values))return [];
  return [...new Set(values.map(v=>String(v||"").trim()).filter(Boolean))];
}
function sortRiskOptions(values){
  return [...normalizeRiskList(values)].sort((a,b)=>a.localeCompare(b,"pt",{sensitivity:"base"}));
}
function getStateRisks(st, itemText){
  if(!st)return [];
  const merged=normalizeRiskList([...(Array.isArray(st.risks)?st.risks:[]), st.risk]);
  st.risks=merged;
  if("risk" in st)delete st.risk;
  return st.risks;
}
function getOccurrenceRisks(occ){
  if(!occ)return [];
  const merged=normalizeRiskList([...(Array.isArray(occ.risks)?occ.risks:[]), occ.risk]);
  occ.risks=merged;
  if("risk" in occ)delete occ.risk;
  return occ.risks;
}
function riskLabel(risks){return (normalizeRiskList(risks).join(", ")||"Outro");}
function applyCriticalRuleByRisks(target, risks){
  const hasHeight=normalizeRiskList(risks).includes("Queda em altura");
  if(hasHeight){
    target.urgent=true;
    target.autoCritical=true;
    target.deadline="Imediato";
  }else if(target.autoCritical){
    target.urgent=false;
    target.autoCritical=false;
    if(target.deadline==="Imediato")target.deadline="3 dias";
  }
}
async function loadRiskCategories(){
  try{
    const res=await fetch(RISK_CATEGORIES_PATH,{cache:"no-store"});
    if(!res.ok)throw new Error("categories file not reachable");
    const payload=await res.json();
    const incoming=Array.isArray(payload)?payload:(Array.isArray(payload?.riskOptions)?payload.riskOptions:Array.isArray(payload?.categories)?payload.categories:[]);
    const normalized=sortRiskOptions(incoming);
    if(normalized.length)riskOptions=normalized;
  }catch(e){
    console.warn("Não foi possível carregar categorias externas. A usar categorias internas.",e);
    riskOptions=sortRiskOptions(DEFAULT_RISK_OPTIONS);
  }
}
function updateEEFromLote(force=false){const loteEl=document.getElementById("lote");const eeEl=document.getElementById("entidade");if(!loteEl||!eeEl)return;const ee=loteEEMap[normalizeLote(loteEl.value)];if(!ee)return;if(force||!eeEl.value||eeEl.dataset.auto==="true"){eeEl.value=ee;eeEl.dataset.auto="true";}}
function itemTextById(id){for(let si=0;si<sections.length;si++){for(let ii=0;ii<sections[si][1].length;ii++){if(idFor(si,ii)===id)return sections[si][1][ii];}}return"";}
function getFollowUp(txt,urgent=false){const base=riskMap[txt]||{category:"Segurança em obra",risk:"Outro",action:"Corrigir a situação identificada e manter acompanhamento até ao fecho."};if(urgent)return{category:base.category,risk:base.risk,action:"Atuar de imediato e enviar evidência de correção."};return base;}
const STORAGE_KEY="checklistDigital_VisitaObra_V4_18_LIMPA";
const AUTOSAVE_KEY="checklistDigital_VisitaObra_V4_18_LIMPA_AUTOSAVE";
const BACKUP_KEY="checklistDigital_VisitaObra_V4_18_LIMPA_BACKUP";
const THEME_KEY="supervisaoSegurancaTema";
const ISSUER_KEY="supervisaoSegurancaEmitidoPor";
const formFieldIds=["data","hora","lote","entidade","emitido","apreciacaoGlobal","obsGerais"];
function fieldValue(id){const el=document.getElementById(id);return el?el.value:"";}
function setFormFields(data){formFieldIds.forEach(id=>{const el=document.getElementById(id);if(el)el.value=data[id]||"";});}
function formData(){const data={state};formFieldIds.forEach(id=>data[id]=fieldValue(id));return data;}
function rememberIssuer(){const value=fieldValue("emitido");if(value)try{localStorage.setItem(ISSUER_KEY,value);}catch(e){}}
function applyRememberedIssuer(){const el=document.getElementById("emitido");if(!el||el.value)return;try{const value=localStorage.getItem(ISSUER_KEY)||"";if(value&&Array.from(el.options).some(o=>o.value===value))el.value=value;}catch(e){}}

function render(){
  const root=document.getElementById("checklist");root.innerHTML="";
  sections.forEach((sec,si)=>{
    const det=document.createElement("details");det.open=si===0;
    det.innerHTML=`<summary><span class="summaryTitle">${esc(sec[0])}</span><span class="summaryLegend">OK = Em condições&nbsp;&nbsp;&nbsp; NOK = Necessita correção&nbsp;&nbsp;&nbsp; NA = Não aplicável</span><span class="sectionCounter" id="secCount_${si}">0 NOK</span></summary>`;
    sec[1].forEach((txt,ii)=>{
      const id=idFor(si,ii);
      state[id]=state[id]||{status:"",obs:"",photos:[],urgent:false,deadline:"",risks:[],responsible:"Encarregado"};
      const div=document.createElement("div");div.className="item";div.id="item_"+id;
      div.innerHTML=`
        <h3><span class="itemNumber">${itemDisplayNumber(si,ii)}</span><span class="itemTitleText">${esc(txt)}</span><span class="itemQuickChoices"><button class="choice ok" type="button" onclick="setStatus('${id}','OK')">OK</button><button class="choice nok" type="button" onclick="setStatus('${id}','NOK')">NOK</button><button class="choice na" type="button" onclick="setStatus('${id}','NA')">NA</button></span></h3>
        <div class="itemBody">
          <div class="buttons">
            <button class="choice ok" type="button" onclick="setStatus('${id}','OK')">OK</button>
            <button class="choice nok" type="button" onclick="setStatus('${id}','NOK')">NOK</button>
            <button class="choice na" type="button" onclick="setStatus('${id}','NA')">NA</button>
          </div>
          <div class="nokPanel" data-id="${id}">
            <div class="nokTitle">NOK</div><div style="font-size:11px;color:#667085;font-weight:700;margin:-2px 0 8px">Para situações com riscos diferentes no mesmo item, usa as observações para separar por ocorrência. Ex.: Ocorrência 1 — ferros sem proteção; Ocorrência 2 — guarda-corpos incompletos.</div>
            <label class="urgentToggle"><input type="checkbox" id="urgent_${id}" onchange="toggleCritical('${id}',this.checked)"> 🚨 Crítico / imediato</label>
            <div class="nokSubGrid">
              <div><label>Risco</label><div class="quickRisk" id="riskBtns_${id}"></div></div>
              <div><label>Responsável</label><div class="quickResponsible" id="respBtns_${id}"></div></div>
            </div>
            <label style="margin-top:8px">Prazo</label><div class="quickDeadline" id="deadlineBtns_${id}"></div>
          </div>
          <div class="fieldDetails">

            <div class="legendPresetWrap" id="legendWrap_${id}">
              <label style="margin-top:9px">Legenda pré-definida</label>
              <button type="button" class="legendPickerBtn" onclick="openLegendPicker('${id}')">Escolher legenda...</button>
            </div>
            <label style="margin-top:9px">Observações</label>
            <textarea id="obs_${id}" placeholder="Opcional" oninput="state['${id}'].obs=this.value"></textarea>
            <label style="margin-top:9px">Fotografias</label>
            <div class="photoActions">
              <label class="photoBtn cameraBtn">📷 Foto<input type="file" accept="image/*" capture="environment" onchange="loadPhotos('${id}',this)"></label>
              <label class="photoBtn galleryBtn">🖼️ Anexar<input type="file" accept="image/*" onchange="loadPhotos('${id}',this)"></label>
            </div>
            <div class="photoGrid" id="photos_${id}"></div>
            <div class="extraOccWrap">
              <div class="extraOccTop">
                <div class="extraOccTitle">Ocorrências adicionais</div>
                <button type="button" class="addOccBtn" onclick="addExtraOccurrence('${id}')">+ Adicionar ocorrência</button>
              </div>
              <div class="extraOccList" id="extraOcc_${id}"></div>
            </div>
          </div>
        </div>`;
      det.appendChild(div);
    });
    root.appendChild(det);
  });
  update();
  applyItemSearch();
}


function ensureExtraOccurrences(id){
  state[id]=state[id]||{status:"",obs:"",photos:[],urgent:false,deadline:"",risks:[],responsible:"Encarregado"};
  if(!Array.isArray(state[id].extraOccurrences)) state[id].extraOccurrences=[];
  return state[id].extraOccurrences;
}
function addExtraOccurrence(id){
  const txt=itemTextById(id);
  state[id]=state[id]||{status:"",obs:"",photos:[],urgent:false,deadline:"",risks:[],responsible:"Encarregado"};
  if(state[id].status!=="NOK"){
    state[id].status="NOK";
    state[id].deadline=state[id].deadline||"3 dias";
    state[id].responsible=state[id].responsible||"Encarregado";
    getStateRisks(state[id],txt);
  }
  ensureExtraOccurrences(id).push({risks:["Outro"],obs:"",photos:[],urgent:false,deadline:"3 dias",responsible:"Encarregado"});
  scheduleAutosave();
  update();
  setTimeout(()=>{
    const box=document.getElementById("extraOcc_"+id);
    const last=box&&box.querySelector(".extraOccCard:last-child");
    if(last)last.scrollIntoView({behavior:"smooth",block:"center"});
  },80);
}
function removeExtraOccurrence(id,idx){
  ensureExtraOccurrences(id).splice(idx,1);
  update();
}
function setExtraOccurrence(id,idx,field,val){
  const occ=ensureExtraOccurrences(id)[idx];
  if(!occ)return;
  if(field==="risk"){
    occ.risks=normalizeRiskList([val]);
    applyCriticalRuleByRisks(occ,occ.risks);
    update();
    return;
  }
  occ[field]=val;
  update();
}
function toggleExtraRisk(id,idx,val){
  const occ=ensureExtraOccurrences(id)[idx];
  if(!occ)return;
  const selected=getOccurrenceRisks(occ);
  occ.risks=selected.includes(val)?selected.filter(r=>r!==val):[...selected,val];
  applyCriticalRuleByRisks(occ,occ.risks);
  update();
}
function toggleExtraRiskEncoded(id,idx,encodedVal){toggleExtraRisk(id,idx,decodeURIComponent(encodedVal));}
function toggleExtraCritical(id,idx,checked){
  const occ=ensureExtraOccurrences(id)[idx];
  if(!occ)return;
  occ.urgent=checked;
  occ.autoCritical=false;
  if(checked)occ.deadline="Imediato";
  if(!checked && occ.deadline==="Imediato")occ.deadline="3 dias";
  update();
}
function compressExtraImage(dataUrl,maxSide=900,quality=.62){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>{
      const scale=Math.min(1,maxSide/Math.max(img.width,img.height));
      const canvas=document.createElement("canvas");
      canvas.width=Math.max(1,Math.round(img.width*scale));
      canvas.height=Math.max(1,Math.round(img.height*scale));
      canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
      resolve(canvas.toDataURL("image/jpeg",quality));
    };
    img.onerror=reject;
    img.src=dataUrl;
  });
}
function loadExtraPhotos(id,idx,input){
  const files=[...input.files];if(!files.length)return;
  const occ=ensureExtraOccurrences(id)[idx];if(!occ)return;
  occ.photos=occ.photos||[];
  let pending=files.length;
  files.forEach(file=>{
    const reader=new FileReader();
    reader.onload=e=>{
      compressExtraImage(e.target.result).then(data=>{occ.photos.push(data);}).catch(()=>{occ.photos.push(e.target.result);}).finally(()=>{
        pending--;if(pending===0){input.value="";update();}
      });
    };
    reader.readAsDataURL(file);
  });
}
function removeExtraPhoto(id,idx,pidx){
  const occ=ensureExtraOccurrences(id)[idx];if(!occ)return;
  occ.photos=(occ.photos||[]).filter((_,i)=>i!==pidx);
  update();
}
function autoLegendByRisk(item,risk,obs){
  if(obs && String(obs).trim()) return normalizeText(obs);
  const m={
    "Queda em altura":"Proteção coletiva inexistente, incompleta ou insuficiente em zona com risco de queda em altura.",
    "Queda em nível diferente":"Abertura, negativo ou desnível sem proteção ou sinalização adequada.",
    "Queda ao mesmo nível":"Condições de organização, limpeza ou circulação com risco de queda ao mesmo nível.",
    "Corte / golpe / perfuração":"Elementos com extremidades cortantes ou perfurantes sem proteção adequada.",
    "Risco elétrico":"Rede, cabo, quadro ou equipamento elétrico provisório em condições de segurança insuficientes.",
    "Soterramento":"Escavação ou movimentação de terras sem proteção, delimitação ou estabilidade adequada.",
    "Queda de objetos":"Operação ou armazenamento com risco de queda de objetos sobre trabalhadores ou zonas de circulação.",
    "Substâncias químicas":"Substâncias químicas sem armazenamento, identificação ou contenção adequada.",
    "Líquidos":"Bacia, escorrência ou líquido sem contenção ou encaminhamento adequado."
  };
  return m[risk] || (item+" — situação NOK registada.");
}
function renderExtraOccurrences(id){
  const box=document.getElementById("extraOcc_"+id);
  if(!box)return;
  const occs=ensureExtraOccurrences(id);
  box.innerHTML=occs.map((occ,idx)=>{
    const photos=(occ.photos||[]).map((p,pidx)=>`<span class="photoBox"><img src="${p}"><button type="button" onclick="removeExtraPhoto('${id}',${idx},${pidx})">×</button></span>`).join("");
    const selectedRisks=getOccurrenceRisks(occ);
    return `<div class="extraOccCard">
      <div class="extraOccHead"><span>Ocorrência adicional ${idx+2}</span><button type="button" class="removeOccBtn" onclick="removeExtraOccurrence('${id}',${idx})">Remover</button></div>
      <label class="urgentToggle"><input type="checkbox" ${occ.urgent?"checked":""} onchange="toggleExtraCritical('${id}',${idx},this.checked)"> 🚨 Crítico / imediato</label>
      <div class="extraOccGrid">
        <div><label>Riscos (seleção múltipla)</label><div class="quickRisk">${riskOptions.map(r=>`<button type="button" class="riskBtn ${selectedRisks.includes(r)?"active":""}" onclick="toggleExtraRiskEncoded('${id}',${idx},'${encodeURIComponent(r)}')">${r}</button>`).join("")}</div></div>
        <div><label>Responsável</label><select class="extraOccSelect" onchange="setExtraOccurrence('${id}',${idx},'responsible',this.value)">${responsibleOptions.map(r=>`<option value="${r}" ${occ.responsible===r?"selected":""}>${r}</option>`).join("")}</select></div>
      </div>
      <label style="margin-top:8px">Prazo</label><select class="extraOccSelect" onchange="setExtraOccurrence('${id}',${idx},'deadline',this.value)">${deadlineOptions.map(r=>`<option value="${r}" ${occ.deadline===r?"selected":""}>${r}</option>`).join("")}</select>
      <label style="margin-top:8px">Legenda / observação</label>
      <textarea placeholder="Ex.: Ferros de espera sem proteção nas extremidades." oninput="setExtraOccurrence('${id}',${idx},'obs',this.value)">${esc(occ.obs||"")}</textarea>
      <label style="margin-top:8px">Fotografias desta ocorrência</label>
      <div class="photoActions">
        <label class="photoBtn cameraBtn">📷 Foto<input type="file" accept="image/*" capture="environment" onchange="loadExtraPhotos('${id}',${idx},this)"></label>
        <label class="photoBtn galleryBtn">🖼️ Anexar<input type="file" accept="image/*" onchange="loadExtraPhotos('${id}',${idx},this)"></label>
      </div>
      <div class="extraOccPhotos">${photos}</div>
    </div>`;
  }).join("");
}


const predefinedLegends = {
  "Vedação da Obra":[
    "Vedação do estaleiro incompleta — risco de acesso de pessoas não autorizadas à zona de obra.",
    "Vedação instável com suporte improvisado — risco de queda ao mesmo nível por colapso ou deslocação.",
    "Aberturas na vedação e presença de materiais e resíduos dispersos no estaleiro.",
    "Zona de obra sem delimitação clara entre circulação, armazenamento e frentes de trabalho.",
    "Materiais armazenados junto à vedação de forma desorganizada, condicionando a circulação."
  ],
  "Organização Geral do Estaleiro":[
    "Organização global do estaleiro com materiais dispersos e zonas sem delimitação clara — risco de queda ao mesmo nível.",
    "Deficiente limpeza e arrumação da frente de trabalho, com obstrução parcial da circulação — risco de queda ao mesmo nível.",
    "Materiais armazenados sem corredores de circulação devidamente definidos — risco de queda ao mesmo nível.",
    "Empilhamento irregular de materiais sem estabilização adequada — risco de queda ao mesmo nível."
  ],
  "Caminhos de Circulação":[
    "Caminho de circulação obstruído por materiais e resíduos — risco de queda ao mesmo nível.",
    "Caminho de circulação sem condições adequadas, com obstáculos e materiais depositados na passagem — risco de queda ao mesmo nível.",
    "Terreno irregular na zona de circulação — risco de queda ao mesmo nível.",
    "Cabos elétricos dispersos nos caminhos de circulação — risco de queda ao mesmo nível.",
    "Caminho de circulação improvisado sobre estrutura incompleta e com obstáculos — risco de queda ao mesmo nível/nível diferente."
  ],
  "Vitrine de Obra":[
    "Documentação obrigatória de obra em falta, incompleta ou sem afixação visível.",
    "Vitrine de obra sem atualização da documentação de segurança aplicável.",
    "Informação de segurança e documentação de estaleiro sem organização ou visibilidade adequada.",
    "Comunicação prévia, contactos de emergência ou elementos obrigatórios sem afixação acessível.",
    "Vitrine de obra sem condições adequadas de consulta pelos intervenientes."
  ],
  "Redes Técnicas Provisórias":[
    "Cabos elétricos dispersos na zona de circulação — risco de queda ao mesmo nível.",
    "Instalação provisória desorganizada, com cabos soltos em zona de passagem.",
    "Luminária provisória suspensa com cabo solto atravessando a zona de trabalho.",
    "Presença de cabos elétricos e água na zona de trabalho — risco de queda e contacto elétrico indireto."
  ],
  "Emergência":[
    "Acesso condicionado ao equipamento de emergência por obstrução parcial da área envolvente.",
    "Obstrução do meio de primeira intervenção e deficiente organização do local de trabalho.",
    "Instalações de emergência em zona desorganizada, com constrangimento na resposta a uma emergência."
  ],
  "Sinalização":[
    "Delimitação deficiente em zona adjacente a desnível — risco de queda em nível diferente.",
    "Sinalização de segurança incompleta ou insuficiente.",
    "Rede de sinalização danificada ou inexistente."
  ],
  "Instalações Sociais - Sanitários, Vestiários e Balneários":[
    "Instalações sociais sem condições adequadas de limpeza, organização ou utilização.",
    "Sanitários, vestiários ou balneários com necessidade de reforço de limpeza e manutenção.",
    "Zona de instalações sociais com materiais ou resíduos acumulados, condicionando a utilização.",
    "Condições de higiene das instalações sociais insuficientes face à utilização da obra.",
    "Acesso às instalações sociais condicionado por materiais ou organização deficiente."
  ],
  "Instalações Sociais - Copas e Refeitórios":[
    "Copa ou refeitório sem condições adequadas de limpeza e organização.",
    "Zona de refeições com necessidade de reforço de higiene e arrumação.",
    "Materiais ou resíduos acumulados na zona de copa/refeitório, condicionando a utilização.",
    "Condições de utilização da copa/refeitório insuficientes face às necessidades da obra.",
    "Espaço de refeições sem separação ou organização adequada relativamente às zonas de trabalho."
  ],
  "Ferramentaria":[
    "Ferramentas e materiais depositados de forma desorganizada, condicionando a circulação.",
    "Ferramentas armazenadas junto a zonas de passagem, criando risco de queda ao mesmo nível.",
    "Ferramentaria ou zona de apoio sem arrumação adequada dos equipamentos e utensílios.",
    "Ferramentas e equipamentos acumulados diretamente no solo, sem delimitação definida.",
    "Materiais e ferramentas dispersos na frente de trabalho, dificultando a circulação segura."
  ],
  "Parque de Materiais":[
    "Parque de materiais inexistente, com armazenagem dispersa e desorganizada.",
    "Materiais depositados em zona de passagem, condicionando a circulação.",
    "Armazenamento desorganizado de materiais — risco de queda ao mesmo nível.",
    "Deposição desordenada de materiais em áreas não definidas como parque de materiais."
  ],
  "Parque de Resíduos":[
    "Parque de resíduos desorganizado, com resíduos espalhados no caminho de circulação.",
    "Deficiente limpeza e arrumação da zona de resíduos — risco de queda ao mesmo nível.",
    "Resíduos dispersos em zona de circulação e trabalho.",
    "Armazenamento de madeiras com elementos perfurantes expostos — risco de perfuração e queda ao mesmo nível."
  ],
  "Parque de Pré-Fabrico de Armaduras de Ferro":[
    "Ferros em espera sem proteção nas extremidades — risco de perfuração.",
    "Ferros salientes ao nível do solo, sem proteção, junto a zona de circulação.",
    "Armaduras e varões armazenados de forma desorganizada, condicionando a circulação segura.",
    "Elementos perfurantes expostos na estrutura — risco de perfuração ou corte.",
    "Zona de pré-fabrico de armaduras sem organização adequada e com ferros expostos.",
    "Ferros em espera desprotegidos junto a abertura ou desnível — risco de perfuração e queda.",
    "Varões e materiais metálicos depositados junto ao bordo da estrutura, sem arrumação adequada."
  ],
  "Substâncias Químicas":[
    "Produtos químicos sem armazenamento adequado, identificação ou contenção.",
    "Recipientes de produtos químicos depositados sem bacia de retenção ou separação adequada.",
    "Substâncias químicas sem ficha de segurança disponível ou identificação visível.",
    "Armazenamento de produtos químicos em zona de circulação ou trabalho sem proteção adequada.",
    "Tintas, recipientes ou produtos químicos armazenados diretamente no solo, junto a zonas de passagem."
  ],
  "Equipamentos de Proteção Coletiva":[
    "Negativo no pavimento sem proteção ou sinalização adequada — risco de queda em nível diferente.",
    "Abertura existente sem proteção coletiva adequada — risco de queda em nível diferente.",
    "Guarda-corpos incompletos ou inexistentes — risco de queda em altura.",
    "Proteção periférica descontínua ou insuficiente — risco de queda em altura.",
    "Ferros em espera desprotegidos nas extremidades — risco de perfuração.",
    "Fita sinalizadora utilizada em substituição de guarda-corpos ou barreiras físicas adequadas — risco de queda em nível diferente.",
    "Escavação aberta sem delimitação e sem proteção adequada — risco de queda em nível diferente."
  ],
  "Equipamentos de Proteção Individual":[
    "Ausência de utilização de EPI obrigatório em frente de trabalho.",
    "Execução de tarefa sem uso visível de capacete de proteção.",
    "Exposição a poeiras durante operação de corte sem proteção respiratória visível.",
    "Execução de betonagem sem EPI adequado para contacto com betão fresco."
  ],
  "Equipamentos de Trabalho":[
    "Equipamento de trabalho instalado ou utilizado sem condições adequadas de organização e segurança.",
    "Equipamento elétrico provisório e cabos distribuídos no pavimento da área de trabalho de forma desorganizada.",
    "Betoneira instalada diretamente sobre solo arenoso, sem sistema de retenção.",
    "Equipamentos e ferramentas acumulados diretamente no solo, sem delimitação definida.",
    "Equipamentos soltos na frente de trabalho, condicionando a circulação e a execução segura das tarefas.",
    "Equipamento de trabalho sem arrumação definida após utilização, criando obstáculos na zona de passagem."
  ],
  "Andaimes":[
    "Andaime sem guarda-corpos instalados — risco de queda em altura.",
    "Andaime com guarda-corpos incompletos e proteção coletiva insuficiente — risco de queda em altura.",
    "Plataforma de trabalho incompleta no andaime.",
    "Descontinuidade no piso de trabalho do andaime — risco de queda em altura.",
    "Base de apoio de andaime assente em terreno irregular com elemento improvisado."
  ],
  "Plataformas de Trabalho":[
    "Plataforma de trabalho sem guarda-corpos e sem proteção coletiva nas extremidades — risco de queda em altura.",
    "Utilização de plataforma improvisada e incompleta, sem condições regulamentares de estabilidade e proteção.",
    "Plataforma improvisada sem proteção coletiva adequada — risco de queda em altura."
  ],
  "Escadas e Escadotes":[
    "Utilização de escadote para trabalhos prolongados em altura — risco de queda em altura.",
    "Escada portátil sem condições adequadas de estabilidade.",
    "Escada portátil sem fixação adequada e utilizada como acesso principal — risco de queda em altura.",
    "Escadote utilizado sobre superfície irregular, sem condições adequadas de estabilidade.",
    "Utilização de escada de mão como meio de acesso entre níveis sem condições adequadas."
  ],
  "Trabalhos em Altura":[
    "Execução de trabalhos em altura sem proteção coletiva contínua e adequada — risco de queda em altura.",
    "Realização de trabalhos em altura sem utilização de sistema de proteção individual contra quedas — risco de queda em altura.",
    "Trabalhador a executar atividades junto ao bordo da estrutura sem proteção adequada."
  ],
  "Escavações e Movimentação de Terras":[
    "Escavação aberta sem delimitação e sem proteção adequada — risco de queda em nível diferente.",
    "Zona escavada junto à fachada com desníveis acentuados a servir como caminho de circulação.",
    "Escavação e zonas técnicas sem proteção coletiva eficaz nem acesso seguro — risco de queda em nível diferente."
  ],
  "Movimentação Mecânica de Cargas":[
    "Queda de objetos desprendidos durante a movimentação mecânica de cargas.",
    "Zona de movimentação mecânica de cargas sem delimitação adequada.",
    "Operação de elevação com risco de queda de objetos."
  ],
  "Bacia de limpeza de betão":[
    "Ausência de bacia de retenção na zona da betoneira, com possibilidade de derrame e dispersão de resíduos no solo.",
    "Bacia de limpeza de betão inexistente ou sem condições adequadas.",
    "Resíduos de betão depositados sem contenção adequada."
  ],
  "Organização e Limpeza das Frentes de Obra":[
    "Deficiente organização e arrumação da frente de obra — risco de queda ao mesmo nível.",
    "Frente de trabalho desorganizada com condicionamento da circulação.",
    "Materiais e resíduos depositados de forma desorganizada no pavimento.",
    "Acumulação de resíduos e materiais na frente de trabalho — risco de queda ao mesmo nível.",
    "Materiais soltos na zona de trabalho — risco de queda ao mesmo nível e condicionamento da circulação."
  ]
};

function getLegendsForItem(itemName){
  return predefinedLegends[itemName] || [];
}

function applyPredefinedLegend(id, value){
  if(!value) return;
  const obs=document.getElementById("obs_"+id);
  if(!obs) return;
  obs.value=value;
  state[id].obs=value;
  scheduleAutosave();
  closeLegendPicker();
}

let activeLegendItemId="";
function openLegendPicker(id){
  activeLegendItemId=id;
  const modal=document.getElementById("legendModal");
  const title=document.getElementById("legendPickerTitle");
  const search=document.getElementById("legendSearch");
  if(title)title.textContent=itemTextById(id);
  if(search)search.value="";
  renderLegendPickerOptions();
  if(modal)modal.style.display="flex";
  setTimeout(()=>{if(search)search.focus();},80);
}
function closeLegendPicker(){
  const modal=document.getElementById("legendModal");
  if(modal)modal.style.display="none";
  activeLegendItemId="";
}
function filterLegendPicker(){renderLegendPickerOptions();}
function renderLegendPickerOptions(){
  const root=document.getElementById("legendOptions");
  if(!root)return;
  const query=normalizeSearchText(document.getElementById("legendSearch")?.value||"");
  const legends=getLegendsForItem(itemTextById(activeLegendItemId)).filter(t=>!query||normalizeSearchText(t).includes(query));
  root.innerHTML=legends.length?legends.map(t=>`<button type="button" onclick="applyPredefinedLegend('${activeLegendItemId}',this.dataset.value)" data-value="${esc(t)}">${esc(t)}</button>`).join(""):'<p class="legendEmpty">Sem legendas encontradas.</p>';
}

function addLegendSelectToItem(itemEl, id, itemName){
  if(!itemEl || document.getElementById("legendSelect_"+id)) return;
  const obs=document.getElementById("obs_"+id);
  if(!obs) return;

  const legends=getLegendsForItem(itemName);
  if(!legends.length) return;

  const wrap=document.createElement("div");
  wrap.className="legendPresetWrap";
  wrap.innerHTML = '<label style="margin-top:9px">Legenda pré-definida</label>';

  const select=document.createElement("select");
  select.id="legendSelect_"+id;
  select.className="legendPresetSelect";
  select.innerHTML='<option value="">Escolher legenda rápida...</option>' + legends.map(t=>'<option value="'+esc(t)+'">'+esc(t)+'</option>').join("");
  select.onchange=function(){ applyPredefinedLegend(id,this.value); };

  wrap.appendChild(select);
  obs.parentNode.insertBefore(wrap, obs);
}

function setStatus(id,val){
  state[id].status=val;
  scheduleAutosave();
  if(val==="NOK"){
    const txt=itemTextById(id);
    if(!state[id].deadline)state[id].deadline=state[id].urgent?"Imediato":"3 dias";
    if(!state[id].responsible)state[id].responsible="Encarregado";
    const risks=getStateRisks(state[id],txt);
    applyCriticalRuleByRisks(state[id],risks);
  }
  update();
  if(val==="NOK"){
    toggleChecklistItem(id,true);
    const item=document.getElementById("item_"+id);
    if(item){const det=item.closest("details");if(det)det.open=true;item.classList.add("focused");setTimeout(()=>item.classList.remove("focused"),1200);setTimeout(()=>item.scrollIntoView({behavior:"smooth",block:"center"}),80);}
  }else toggleChecklistItem(id,false);
}
function toggleCritical(id,checked){scheduleAutosave();state[id].urgent=checked;state[id].autoCritical=false;if(checked)state[id].deadline="Imediato";if(!checked&&state[id].deadline==="Imediato")state[id].deadline="3 dias";update();}
function setDeadline(id,val){state[id].deadline=val;scheduleAutosave();update();}
function setRisk(id,val){
  const current=getStateRisks(state[id]);
  state[id].risks=current.includes(val)?current.filter(r=>r!==val):[...current,val];
  scheduleAutosave();
  applyCriticalRuleByRisks(state[id],state[id].risks);
  update();
}
function setRiskEncoded(id,encodedVal){setRisk(id,decodeURIComponent(encodedVal));}
function setResponsible(id,val){state[id].responsible=val;scheduleAutosave();update();}
function compressImageFile(file,maxW=1000,maxH=1000,quality=.62){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error("Não foi possível ler a fotografia."));
    reader.onload=e=>{
      const img=new Image();
      img.onerror=()=>reject(new Error("Não foi possível processar a fotografia."));
      img.onload=()=>{
        let w=img.width,h=img.height;
        const scale=Math.min(1,maxW/w,maxH/h);
        w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));
        const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext("2d",{alpha:false});
        ctx.fillStyle="#fff";ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL("image/jpeg",quality));
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
async function loadPhotos(id,input){
  const files=[...input.files];if(!files.length)return;
  state[id].photos=state[id].photos||[];
  try{
    for(const file of files){
      const compressed=await compressImageFile(file);
      state[id].photos.push(compressed);
    }
  }catch(err){
    alert(err.message||"Erro ao carregar fotografia.");
  }finally{
    input.value="";update();
  }
}
function removePhoto(id,idx){state[id].photos=(state[id].photos||[]).filter((_,i)=>i!==idx);scheduleAutosave();update();}

function getRiskSummaryData(){
  const counts={};let total=0;
  sections.forEach((sec,si)=>sec[1].forEach((txt,ii)=>{const id=idFor(si,ii);const st=state[id]||{};if(st.status!=="NOK")return;const mainRisks=getStateRisks(st,txt);mainRisks.forEach(r=>{counts[r]=(counts[r]||0)+1;total++;});(ensureExtraOccurrences(id)||[]).forEach(occ=>{const occRisks=getOccurrenceRisks(occ);occRisks.forEach(r=>{counts[r]=(counts[r]||0)+1;total++;});});}));
  const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"pt"));
  return{total,entries};
}
function updateRiskSummary(){
  const el=document.getElementById("riskSummary");if(!el)return;const data=getRiskSummaryData();
  if(!data.total){el.style.display="none";el.innerHTML="";return;}
  el.style.display="block";
  const high=["Queda em altura","Queda em nível diferente","Risco elétrico","Soterramento","Colapso de estrutura","Atropelamento"];
  el.innerHTML=`<div class="riskSummaryTitle">Riscos NOK</div><div class="riskCards">`+data.entries.map(([risk,count])=>`<div class="riskCard ${high.includes(risk)?"high":""}"><strong>${count}</strong><span>${esc(risk)}</span></div>`).join("")+`</div>`;
}

function update(){
  let ok=0,nok=0,na=0,missing=0,critical=0,total=0;
  sections.forEach((sec,si)=>sec[1].forEach((txt,ii)=>{
    const id=idFor(si,ii);const st=state[id]||{};const item=document.getElementById("item_"+id);if(!item)return;
    if(st.status==="NOK"){
      if(!st.responsible)st.responsible="Encarregado";
      const selectedRisks=getStateRisks(st,txt);
      applyCriticalRuleByRisks(st,selectedRisks);
      if(!st.deadline)st.deadline=st.urgent?"Imediato":"3 dias";
    }
    item.classList.toggle("nok",st.status==="NOK");item.classList.toggle("urgent",st.status==="NOK"&&st.urgent===true);
    const badge=document.getElementById("statusBadge_"+id);if(badge){badge.textContent=st.status||"—";badge.className="itemStatusBadge "+(st.status||"pending").toLowerCase();}
    item.querySelectorAll(".choice").forEach(b=>b.classList.remove("active"));if(st.status)item.querySelector("."+st.status.toLowerCase()).classList.add("active");
    if(shouldCountItem(si,st)){
      total++;
      if(st.status==="OK")ok++;
      else if(st.status==="NOK")nok++;
      else if(st.status==="NA")na++;
      else missing++;
      if(st.status==="NOK"&&st.urgent)critical++;
    }
    if(st.status==="NOK"){
      renderExtraOccurrences(id);
      critical += (ensureExtraOccurrences(id)||[]).filter(o=>o.urgent).length;
    }
    const obs=document.getElementById("obs_"+id);if(obs&&obs.value!==(st.obs||""))obs.value=st.obs||"";
    const urgent=document.getElementById("urgent_"+id);if(urgent)urgent.checked=!!st.urgent;
    const riskBtns=document.getElementById("riskBtns_"+id);if(riskBtns){const selected=getStateRisks(st,txt);riskBtns.innerHTML=riskOptions.map(opt=>`<button type="button" class="riskBtn ${selected.includes(opt)?"active":""}" onclick="setRiskEncoded('${id}','${encodeURIComponent(opt)}')">${opt}</button>`).join("");}
    const respBtns=document.getElementById("respBtns_"+id);if(respBtns)respBtns.innerHTML=responsibleOptions.map(opt=>`<button type="button" class="respBtn ${st.responsible===opt?"active":""}" onclick="setResponsible('${id}','${opt}')">${opt}</button>`).join("");
    const btns=document.getElementById("deadlineBtns_"+id);if(btns)btns.innerHTML=deadlineOptions.map(opt=>`<button type="button" class="deadlineBtn ${st.deadline===opt?"active":""}" onclick="setDeadline('${id}','${opt}')">${opt}</button>`).join("");
    const grid=document.getElementById("photos_"+id);if(grid)grid.innerHTML=(st.photos||[]).map((p,idx)=>`<span class="photoBox"><img src="${p}"><button type="button" onclick="removePhoto('${id}',${idx})">×</button></span>`).join("");
  }));
  document.getElementById("countOK").textContent=ok;document.getElementById("countNOK").textContent=nok;document.getElementById("countNA").textContent=na;document.getElementById("countCritical").textContent=critical;
  document.getElementById("progressBar").style.width=(total?((total-missing)/total*100):0)+"%";refreshTopDate();updateSectionCounters();updateRiskSummary();autosaveLight();
}
function updateSectionCounters(){sections.forEach((sec,si)=>{let count=0;sec[1].forEach((_,ii)=>{const st=state[idFor(si,ii)]||{};if(st.status==="NOK")count++;});const el=document.getElementById("secCount_"+si);const details=document.querySelectorAll("#checklist details")[si];if(el)el.textContent=count===1?"1 NOK":count+" NOK";if(details){details.classList.toggle("hasNOK",count>0);if(onlyNOKMode&&count>0)details.open=true;}});}
function toggleOnlyNOK(){onlyNOKMode=!onlyNOKMode;document.body.classList.toggle("onlyNOK",onlyNOKMode);document.getElementById("onlyNOKBtn").textContent=onlyNOKMode?"Ver tudo":"Só NOK";updateSectionCounters();}

function applyItemSearch(){
  const input=document.getElementById("itemSearch");const meta=document.getElementById("searchMeta");if(!input||!meta)return;const q=normalizeSearchText(input.value);let hits=0;
  document.querySelectorAll("#checklist details").forEach(det=>{let sectionHasHit=false;det.querySelectorAll(".item").forEach(item=>{const title=item.querySelector("h3")?.textContent||"";const alias=searchAliases[title]||"";const txt=normalizeSearchText(title+" "+alias);const match=!q||txt.includes(q);item.classList.toggle("hiddenBySearch",!match);item.classList.toggle("searchHit",!!q&&match);if(match){sectionHasHit=true;if(q)hits++;}});det.classList.toggle("hiddenBySearch",!!q&&!sectionHasHit);if(q&&sectionHasHit)det.open=true;});
  if(!q){meta.classList.remove("active");meta.textContent="";return;}
  meta.classList.add("active");meta.textContent=hits===1?"1 item encontrado":hits+" itens encontrados";
  if(hits===1){const hit=document.querySelector(".item.searchHit");if(hit)setTimeout(()=>hit.scrollIntoView({behavior:"smooth",block:"center"}),80);}
}
function clearItemSearch(){const input=document.getElementById("itemSearch");if(input)input.value="";applyItemSearch();}


let autosaveTimer=null;
function setSaveStatus(msg,type=""){const el=document.getElementById("saveStatus");if(!el)return;el.textContent=msg;el.className="saveStatus"+(type?" "+type:"");}
function scheduleAutosave(){setSaveStatus("Alterações por guardar","warn");clearTimeout(autosaveTimer);autosaveTimer=setTimeout(()=>{autosaveLight();setSaveStatus("Guardado automaticamente","ok");},700);}
function autosaveLight(){
  try{
    const data=formData();
    const light=JSON.parse(JSON.stringify(data));
    if(light.state){
      Object.keys(light.state).forEach(k=>{
        if(light.state[k]){
          light.state[k].photos=[];
          if(Array.isArray(light.state[k].extraOccurrences)){
            light.state[k].extraOccurrences.forEach(o=>o.photos=[]);
          }
        }
      });
    }
    localStorage.setItem(AUTOSAVE_KEY,JSON.stringify({savedAt:new Date().toISOString(),data:light}));
  }catch(e){console.warn("autosave leve falhou",e);}
}

function saveData(showAlert=true){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(formData()));
    if(showAlert)alert("Guardado neste dispositivo.");
    setSaveStatus("Guardado neste dispositivo","ok");
    autosaveLight();
    return true;
  }catch(err){
    console.warn("Não foi possível guardar localmente:",err);
    if(showAlert)alert("O relatório tem fotografias pesadas e não coube na memória local do browser. O PDF pode ser gerado na mesma.");
    return false;
  }
}
function hasMeaningfulVisitData(d){
  if(!d)return false;
  const filledFields=["lote","entidade","apreciacaoGlobal","obsGerais"].some(id=>String(d[id]||"").trim());
  const filledState=Object.values(d.state||{}).some(st=>st&&(st.status||String(st.obs||"").trim()||(st.photos||[]).length||(st.extraOccurrences||[]).length));
  return filledFields||filledState;
}
function loadData(){
  setCurrentVisitDateTime();
  const raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){setSaveStatus("Nova visita · data e hora atuais","");return;}
  try{
    const d=JSON.parse(raw);
    if(!hasMeaningfulVisitData(d)){state={};setCurrentVisitDateTime();applyRememberedIssuer();setSaveStatus("Nova visita · data e hora atuais","");return;}
    state=d.state||{};
    sections.forEach((sec,si)=>sec[1].forEach((txt,ii)=>{const id=idFor(si,ii);state[id]=state[id]||{status:"",obs:"",photos:[],urgent:false,deadline:"",risks:[],responsible:"Encarregado"};getStateRisks(state[id],txt);(state[id].extraOccurrences||[]).forEach(occ=>{getOccurrenceRisks(occ);});}));
    setFormFields(d);
    applyRememberedIssuer();
    ensureDateValue();
    ensureTimeValue();
    setSaveStatus("Visita em curso carregada","ok");
  }catch(e){
    state={};
    setCurrentVisitDateTime();
    applyRememberedIssuer();
    setSaveStatus("Nova visita · data e hora atuais","");
  }
}
function makeBackupBeforeClear(){
  try{
    const backup={savedAt:new Date().toISOString(),data:formData()};
    localStorage.setItem(BACKUP_KEY,JSON.stringify(backup));
    return true;
  }catch(e){
    console.warn("Backup completo falhou:",e);
    try{
      const light=formData();
      if(light.state){
        Object.keys(light.state).forEach(k=>{
          if(light.state[k]){
            light.state[k].photos=[];
            if(Array.isArray(light.state[k].extraOccurrences)){
              light.state[k].extraOccurrences.forEach(o=>o.photos=[]);
            }
          }
        });
      }
      localStorage.setItem(BACKUP_KEY,JSON.stringify({savedAt:new Date().toISOString(),data:light,light:true}));
      return true;
    }catch(err){
      console.warn("Backup leve falhou:",err);
      return false;
    }
  }
}

function updateRestoreNotice(){
  const el=document.getElementById("restoreNotice");
  const btn=document.getElementById("restoreActionBtn");
  try{
    const available=!!localStorage.getItem(BACKUP_KEY);
    if(el)el.classList.toggle("active",available);
    if(btn)btn.classList.toggle("unavailable",!available);
  }catch(e){}
}

function toggleMoreOptions(force){
  const panel=document.getElementById("moreActions");
  const btn=document.getElementById("moreOptionsBtn");
  if(!panel||!btn)return;
  const open=typeof force==="boolean"?force:!panel.classList.contains("open");
  panel.classList.toggle("open",open);
  btn.setAttribute("aria-expanded",String(open));
  btn.textContent="⋮";
  btn.title=open?"Fechar opções":"Mais opções";
}

function resolveTheme(preference){
  return "light";
}
function updateThemeButtons(preference){
  document.querySelectorAll("[data-theme-choice]").forEach(btn=>btn.classList.toggle("active",btn.dataset.themeChoice===preference));
}
function applyThemePreference(preference){
  document.documentElement.dataset.theme="light";
  updateThemeButtons("light");
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content="#0050b5";
}
function setThemePreference(preference){
  try{localStorage.setItem(THEME_KEY,"light");}catch(e){}
  applyThemePreference("light");
}
function loadThemePreference(){
  try{localStorage.setItem(THEME_KEY,"light");}catch(e){}
  applyThemePreference("light");
}

function clearForm(){
  if(!confirm("Queres mesmo limpar esta visita? Vou criar uma cópia de segurança antes de limpar."))return;
  if(!confirm("Confirmação final: limpar campos, checklist e fotos desta visita?"))return;

  makeBackupBeforeClear();

  try{localStorage.removeItem(STORAGE_KEY);}catch(e){console.warn(e);}
  state={};

  document.querySelectorAll("input, textarea").forEach(el=>{
    if(el.type==="file")el.value="";
    else if(el.type==="checkbox")el.checked=false;
    else el.value="";
  });
  document.querySelectorAll("select").forEach(el=>{el.selectedIndex=0;});

  setCurrentVisitDateTime();
  applyRememberedIssuer();
  updateEEFromLote(false);
  refreshTopDate();
  render();
  updateRestoreNotice();
  alert("Visita limpa. Foi guardada uma cópia de segurança para recuperação.");
}

function restoreLastBackup(){
  let raw=null;
  try{raw=localStorage.getItem(BACKUP_KEY);}catch(e){}
  if(!raw){
    alert("Não encontrei cópia de segurança para recuperar.");
    return;
  }
  if(!confirm("Recuperar a última cópia de segurança guardada antes de limpar?"))return;

  try{
    const backup=JSON.parse(raw);
    const data=backup.data||backup;

    setFormFields(data);
    state=data.state||{};

    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
    refreshTopDate();
    render();
    updateRestoreNotice();

    alert(backup.light?"Recuperado sem fotografias, porque o backup completo era demasiado pesado.":"Cópia de segurança recuperada.");
  }catch(err){
    console.error(err);
    alert("Não consegui recuperar a cópia de segurança: "+(err.message||err));
  }
}

function currentBackupPayload(){
  return {app:"SupervisaoSegurancaObra",version:"v4.18-limpa",exportedAt:new Date().toISOString(),data:formData()};
}
function safeFilenamePart(v){return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_-]+/gi,"-").replace(/^-+|-+$/g,"")||"visita";}
function exportBackup(){
  try{
    const payload=currentBackupPayload();
    const name="supervisao-obra-"+safeFilenamePart(payload.data.lote)+"-"+(payload.data.data||localDateValue())+".json";
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=name;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
    setSaveStatus("Backup descarregado","ok");
  }catch(err){console.error(err);alert("Não consegui descarregar o backup: "+(err.message||err));}
}
function importBackupFile(input){
  const file=input.files&&input.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result);
      const data=payload.data||payload;
      if(!data || !data.state)throw new Error("Ficheiro de backup inválido.");
      if(!confirm("Importar este backup e substituir a visita atual?"))return;
      setFormFields(data);
      state=data.state||{};
      localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
      refreshTopDate();render();updateRestoreNotice();setSaveStatus("Backup importado","ok");
    }catch(err){console.error(err);alert("Não consegui importar o backup: "+(err.message||err));}
    finally{input.value="";}
  };
  reader.readAsText(file);
}

function getBaseCounts(){let ok=0,nok=0,na=0,missing=0,total=0;sections.forEach((sec,si)=>sec[1].forEach((_,ii)=>{const st=state[idFor(si,ii)]||{};if(!shouldCountItem(si,st))return;total++;if(st.status==="OK")ok++;else if(st.status==="NOK")nok++;else if(st.status==="NA")na++;else missing++;}));return{ok,nok,na,missing,total};}
function buildGlobalAppreciation(counts,nokCount,criticalCount,riskSummaryData){
  if(!nokCount)return "Não foram registadas situações NOK na presente visita. Recomenda-se a manutenção das condições observadas e o acompanhamento regular dos pontos de segurança verificados.";
  const topRisks=(riskSummaryData.entries||[]).slice(0,3).map(([r,c])=>c+" em "+r).join(", ");
  const criticalText=criticalCount?" Existem "+criticalCount+" situação(ões) crítica(s) que requerem resolução imediata e envio de evidência de correção.":" Não foram identificadas situações críticas.";
  const missingText=counts.missing?" Permanecem "+counts.missing+" ponto(s) por responder, pelo que a leitura global deve ser fechada após conclusão da checklist.":" A checklist encontra-se totalmente respondida.";
  return "Foram registadas "+nokCount+" situação(ões) NOK na presente visita"+(topRisks?", com maior incidência nos seguintes riscos: "+topRisks:".")+"."+criticalText+" Recomenda-se o acompanhamento das ações corretivas definidas dentro dos prazos estabelecidos."+missingText;
}
function photoCountFromEntries(entries){return entries.reduce((total,entry)=>total+((entry.occ?entry.occ.photos:entry.st.photos)||[]).length,0);}

function getNOKItems(){const arr=[];sections.forEach((sec,si)=>sec[1].forEach((txt,ii)=>{const id=idFor(si,ii);const st=state[id]||{};if(st.status!=="NOK")return;const f=getFollowUp(txt,st.urgent);arr.push({id,section:sec[0],text:txt,urgent:!!st.urgent,risk:riskLabel(getStateRisks(st,txt))||f.risk||"Outro",deadline:st.deadline||(st.urgent?"Imediato":"3 dias"),responsible:st.responsible||"Encarregado",photos:(st.photos||[]).length});(ensureExtraOccurrences(id)||[]).forEach((occ,idx)=>arr.push({id,section:sec[0],text:txt+" — ocorrência adicional "+(idx+2),urgent:!!occ.urgent,risk:riskLabel(getOccurrenceRisks(occ)),deadline:occ.deadline||(occ.urgent?"Imediato":"3 dias"),responsible:occ.responsible||"Encarregado",photos:(occ.photos||[]).length}));}));return arr;}
function showVisitSummary(){update();const noks=getNOKItems();const data=getRiskSummaryData();const modal=document.getElementById("summaryModal");const content=document.getElementById("summaryContent");const critical=noks.filter(n=>n.urgent).length;const noPhoto=noks.filter(n=>!n.photos).length;const risks=data.entries.length?data.entries.map(([r,c])=>`${c} · ${r}`).join("<br>"):"Sem riscos NOK registados.";content.innerHTML=`<p><strong>NOK:</strong> ${noks.length}</p><p><strong>Críticos:</strong> ${critical}</p><p><strong>NOK sem fotografia:</strong> ${noPhoto}</p><p><strong>Riscos:</strong><br>${risks}</p><p><strong>PDF:</strong> só serão incluídas situações NOK/CRÍTICAS.</p><p><strong>Regra:</strong> Queda em altura passa automaticamente a crítico.</p>`;modal.style.display="flex";}
function closeVisitSummary(){document.getElementById("summaryModal").style.display="none";}
function saveAndGeneratePDF(){
  setSaveStatus("A preparar relatório...","");
  try{ saveData(false); }catch(e){ console.warn(e); }
  try{ generateReport(); }
  catch(err){
    console.error(err);
    alert("Erro ao gerar o relatório: "+(err.message||err));
  }
}

function closeReportOverlay(){
  const overlay=document.getElementById("reportOverlay");
  if(overlay) overlay.remove();
  document.body.classList.remove("reportOpen");
  setSaveStatus("Guardado automaticamente","ok");
}

function buildReportEmailDraft(){
  ensureDateValue();ensureTimeValue();update();
  const d=formData();
  const counts=getBaseCounts();
  const noks=getNOKItems();
  const critical=noks.filter(n=>n.urgent).length;
  const risks=getRiskSummaryData().entries.map(([risk,count])=>`${count} - ${risk}`).join("; ") || "Sem riscos NOK registados";
  const lote=String(d.lote||"").trim();
  const ee=String(d.entidade||"").trim();
  const subject=["Relatório de visita de segurança",lote?`Lote ${lote}`:"",formatDatePT(d.data)].filter(Boolean).join(" - ");
  const followUp=noks.length
    ? "Solicita-se o acompanhamento das ações corretivas identificadas, dentro dos prazos definidos no relatório."
    : "Não foram registadas situações NOK na presente visita.";
  const body=[
    "Exmos. Senhores,",
    "",
    "No seguimento da visita de supervisão de segurança realizada em obra, envio em anexo o respetivo relatório para conhecimento e acompanhamento.",
    "",
    "Dados da visita:",
    lote?`Lote: ${lote}`:"",
    ee?`Entidade Executante: ${ee}`:"",
    `Data: ${formatDatePT(d.data)}${d.hora?` · ${d.hora}`:""}`,
    "",
    "Resumo:",
    `OK: ${counts.ok}`,
    `NOK: ${noks.length}`,
    `NA: ${counts.na}`,
    `Situações críticas: ${critical}`,
    `Riscos NOK: ${risks}.`,
    "",
    followUp,
    "",
    "Com os melhores cumprimentos,"
  ].filter(line=>line!==null&&line!==undefined).join("\n");
  return {subject,body};
}
function reportEmail(){
  const email=buildReportEmailDraft();
  window.location.href=`mailto:?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  setSaveStatus("Email preparado. Anexa o PDF guardado.","ok");
}

function printReportView(){
  const msg=document.getElementById("printHelp");
  try{
    if(msg){msg.className="printHelp";msg.textContent="A abrir as opções de impressão...";}
    window.focus();
    window.print();
    setTimeout(()=>{if(msg){msg.className="printHelp warn";msg.textContent="Se nada abriu, este navegador bloqueou a impressão. Abre o ficheiro no Chrome e volta a tentar."; }},1400);
  }catch(err){
    if(msg){msg.className="printHelp warn";msg.textContent="Este navegador bloqueou a impressão. Abre o ficheiro no Chrome e volta a tentar.";}
  }
}

function reportPrint(){printReportView();}
function voltarChecklist(){closeReportOverlay();}

function openReportInSameTab(reportHtml){
  try{sessionStorage.setItem("ultimoRelatorioSupervisao",reportHtml);}catch(e){}
  closeReportOverlay();
  const parsed=new DOMParser().parseFromString(reportHtml,"text/html");
  const styles=Array.from(parsed.head.querySelectorAll("style")).map(s=>s.outerHTML).join("");
  const bodyHtml=parsed.body.innerHTML.replace(/<script[\s\S]*?<\/script>/gi,"");
  const overlay=document.createElement("div");
  overlay.id="reportOverlay";
  overlay.className="reportOverlay";
  overlay.innerHTML=styles+'<div class="reportPage">'+bodyHtml+"</div>";
  document.body.appendChild(overlay);
  document.body.classList.add("reportOpen");
  setSaveStatus("Relatório pronto","ok");
}

function generateReport(){
  ensureDateValue();ensureTimeValue();refreshTopDate();update();const d=formData();let nokHtml="",photoHtml="",nokCount=0,criticalCount=0,photoIndex=1,skippedPhotos=0;
  const appUrl=location.href.split("#")[0].split("?")[0];
  const MAX_REPORT_PHOTOS=18;
  const counts=getBaseCounts();
  const riskSummaryData=getRiskSummaryData();const riskSummaryHtml=riskSummaryData.entries.length?riskSummaryData.entries.map(([risk,count])=>`<span class="riskPill">${count} · ${esc(risk)}</span>`).join(""):"";
  const nokEntries=[];sections.forEach((sec,si)=>sec[1].forEach((txt,ii)=>{const id=idFor(si,ii);const st=state[id]||{};if(st.status!=="NOK")return;nokEntries.push({sec,txt,id,st,occ:null,sub:1});(ensureExtraOccurrences(id)||[]).forEach((occ,idx)=>nokEntries.push({sec,txt,id,st,occ,sub:idx+2}));}));
  const reportPhotoCount=photoCountFromEntries(nokEntries);
  nokEntries.sort((a,b)=>((b.occ?b.occ.urgent:b.st.urgent)===true)-((a.occ?a.occ.urgent:a.st.urgent)===true));
  nokEntries.forEach(entry=>{const sec=entry.sec,txt=entry.txt,st=entry.st,occ=entry.occ;nokCount++;const urgent=occ?!!occ.urgent:!!st.urgent;if(urgent)criticalCount++;const f=getFollowUp(txt,urgent);const selectedRisks=occ?getOccurrenceRisks(occ):getStateRisks(st,txt);const selectedRisk=selectedRisks[0]||f.risk||"Outro";const selectedRiskText=riskLabel(selectedRisks);const selectedResponsible=occ?(occ.responsible||"Encarregado"):(st.responsible||"Encarregado");const obs=occ?autoLegendByRisk(txt,selectedRisk,occ.obs):(normalizeText(st.obs)||autoLegendByRisk(txt,selectedRisk,""));const prazo=occ?(occ.deadline||(urgent?"Imediato":"3 dias")):(st.deadline||(urgent?"Imediato":"3 dias"));const code=(urgent?"CRÍTICO-":"NOK-")+nokCount;const photos=occ?(occ.photos||[]):(st.photos||[]);const photoNote=photos.length?`<div class="photoNote">${photos.length} fotografia(s) no registo fotográfico.</div>`:"";
    nokHtml+=`<div class="nokBox ${urgent?'critical':''}"><div class="nokHead">${esc(code)} · ${esc(txt)}</div><div class="nokCategory">${esc(sec[0])}</div><div>${esc(obs)}</div><div><strong>Risco:</strong> ${esc(selectedRiskText)}</div><div><strong>Ação:</strong> ${esc(f.action)}</div><div><strong>Responsável:</strong> ${esc(selectedResponsible)} · <strong>Prazo:</strong> ${esc(prazo)} · <strong>Estado:</strong> Aberta</div>${photoNote}</div>`;
    photos.forEach(p=>{if(photoIndex<=MAX_REPORT_PHOTOS){photoHtml+=`<div class="photoCell"><img src="${p}"><div>Foto ${photoIndex} — ${esc(obs)} (${esc(code)})</div></div>`;photoIndex++;}else{skippedPhotos++;}});
  });
  const appraisal=normalizeText(d.apreciacaoGlobal)||buildGlobalAppreciation(counts,nokCount,criticalCount,riskSummaryData);
  const reportIdFields=[
    ["Lote",d.lote],
    ["Entidade Executante",d.entidade]
  ].filter(([,value])=>String(value||"").trim());
  const reportIdHtml=reportIdFields.map(([label,value])=>`<div class="idCell"><strong>${esc(label)}:</strong> ${esc(value)}</div>`).join("");
  const issuedBy=String(d.emitido||"").trim();
  const emailDraft=buildReportEmailDraft();
  const reportHtml=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>Relatório de Visita</title><style>
  @page{size:A4;margin:10mm 12mm 10mm 12mm;@bottom-right{content:"Página " counter(page);font-size:8px;color:#777;}}
  *{box-sizing:border-box}html,body{max-width:100%;overflow-x:hidden;color-scheme:light!important;background:#fff}body{font-family:Arial,Helvetica,sans-serif;margin:0;color:#222;font-size:9pt;line-height:1.22}button{margin:8px 0 10px;padding:8px 12px;border:0;background:#0050b5;color:#fff;font-weight:bold}
  .header{display:grid;grid-template-columns:130px 1fr 130px;align-items:center;gap:8px;border-bottom:2px solid #0050b5;padding-bottom:7px;margin-bottom:10px}.header img{max-height:28px;max-width:120px;object-fit:contain}.title{text-align:center;font-weight:900;text-transform:uppercase;color:#172033;font-size:13pt;line-height:1.1;letter-spacing:.03em}.sub{font-size:9pt;text-align:center;font-weight:800;margin-top:3px;color:#0050b5}.date{text-align:right;white-space:nowrap;font-size:8pt;margin-top:2px}.pdfWatermark{font-size:6.5pt;font-style:italic;font-weight:400;color:#777;margin-top:2px}
  .bar{background:#4f8fd3;color:white;font-weight:900;text-transform:uppercase;padding:6px 8px;margin:10px 0 7px;font-size:8.5pt;border-radius:3px;letter-spacing:.04em}.idGrid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid #ccc;border-bottom:0;margin-bottom:7px}.idCell{border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:5px 7px;min-height:24px;font-size:8.5pt}.idCell:nth-child(2n){border-right:0}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px}.stat{border:1px solid #d9e2ef;text-align:center;padding:6px;background:#fafafa;border-radius:4px}.stat strong{display:block;color:#0050b5;font-size:13pt}
  .riskLine{border:1px solid #ccc;background:#f8fafc;padding:5px;margin-bottom:8px;font-size:8.5pt}.riskPill{display:inline-block;margin:2px 3px 0 0;padding:3px 6px;border:1px solid #98b7df;border-radius:999px;background:#eef4fb;font-weight:700}
  .nokBox{border:1px solid #f3a6a6;background:#fffafa;padding:8px;margin:7px 0;break-inside:avoid;page-break-inside:avoid;border-radius:4px}.nokBox.critical{border:3px solid #b71c1c;background:#ffecec}.nokHead{font-weight:900;color:#0050b5;margin-bottom:3px;font-size:12pt;line-height:1.15;letter-spacing:.02em}.nokCategory{font-size:8pt;color:#8b95a7;text-transform:uppercase;font-weight:700;margin-bottom:5px;letter-spacing:.04em}.thumb{width:auto;height:auto;max-width:120px;max-height:90px;object-fit:contain;border:1px solid #aaa;margin:3px 3px 0 0;background:#fff}.photoNote{font-size:8pt;color:#667085;margin-top:4px;font-weight:700}
  .photoGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px;align-items:start}.photoCell{break-inside:avoid;page-break-inside:avoid;font-size:7.8pt;color:#666;line-height:1.25}.photoCell img{width:100%;height:auto;max-height:190px;object-fit:contain;border:1px solid #d8dde6;background:#fff;padding:2px;border-radius:4px}.footer{font-size:8pt;text-align:right;color:#555;border-top:1px solid #ddd;margin-top:8px;padding-top:5px;white-space:normal;overflow-wrap:anywhere}
  @media screen and (max-width:800px){body{font-size:9.5pt;line-height:1.25;padding:6px;background:#fff;max-width:100vw;overflow-x:hidden}.header{grid-template-columns:58px minmax(0,1fr) 72px;gap:4px;text-align:center;background:#fff;border:1px solid #d9e2ef;border-radius:8px;padding:6px;margin-bottom:6px;max-width:100%;overflow:hidden}.header img{margin:auto;max-height:20px;max-width:68px}.title{font-size:9.6pt;overflow-wrap:normal}.sub{font-size:7.2pt}.date{text-align:right;font-size:7pt}.pdfWatermark{text-align:right}.bar{margin:7px 0 4px;padding:5px 7px;font-size:8pt}.idGrid{grid-template-columns:repeat(2,1fr);margin-bottom:5px}.idCell,.idCell:nth-child(3n){border-right:1px solid #ccc;padding:4px 5px;min-height:21px;font-size:8pt}.idCell:nth-child(2n){border-right:0}.idCell.wide{grid-column:span 2}.stats{grid-template-columns:repeat(2,1fr);gap:4px}.stat{padding:4px;font-size:8pt}.stat strong{font-size:11pt}.nokBox{border-radius:6px;padding:7px;margin:5px 0}.nokHead{font-size:10pt}.photoGrid{grid-template-columns:1fr}.photoCell img{height:auto;max-height:230px;object-fit:contain;background:#fff}.footer{text-align:left;font-size:7.5pt}}
  .reportToolbar{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:6px;align-items:center;background:#eef3f8;padding:6px 0;max-width:100%;overflow:hidden}.reportToolbar button{margin:0;padding:9px 10px;border:0;border-radius:8px;background:#0050b5;color:#fff;font-weight:bold;min-width:0}.reportToolbar button.email{background:#eaf3ff;color:#0050b5}.reportToolbar button.back{background:#f1f5f9;color:#344054}.printHelp{grid-column:1/-1;font-size:7.5pt;color:#555;line-height:1.2}.printHelp.warn{color:#9f1d1d;font-weight:700}@media screen and (max-width:800px){.reportToolbar{grid-template-columns:minmax(0,1fr) 48px 42px;gap:5px;padding:5px 0}.reportToolbar button{width:100%;min-height:38px;font-size:0;padding:7px 6px}.reportToolbar button#reportPrintBtn::after{content:"Guardar PDF";font-size:8.5pt}.reportToolbar button.email{font-size:0;width:46px}.reportToolbar button.email::after{content:"Email";font-size:8.3pt}.reportToolbar button.back{font-size:0;width:42px}.reportToolbar button.back::after{content:"←";font-size:18px}.printHelp{text-align:left;font-size:7pt}}
  @media print{.reportToolbar{display:none!important}.bar,.nokBox,.photoCell{break-inside:avoid;page-break-inside:avoid}}
  </style></head><body><div class="reportToolbar"><button type="button" id="reportPrintBtn" onclick="reportPrint()">Abrir impressão / Guardar PDF</button><button type="button" class="email" onclick="reportEmail()">Email</button><button type="button" class="back" onclick="voltarChecklist()">Voltar à checklist</button><div id="printHelp" class="printHelp">Abre as opções de impressão. No telemóvel seleciona “Guardar como PDF”. Depois usa “Email” para preparar o envio.</div></div><script>
  const appUrl=${JSON.stringify(appUrl)};
  const emailSubject=${JSON.stringify(emailDraft.subject)};
  const emailBody=${JSON.stringify(emailDraft.body)};
  function voltarChecklist(){
    try{if(parent&&parent.closeReportOverlay){parent.closeReportOverlay();return;}}catch(e){}
    try{location.replace(appUrl+(appUrl.includes('?')?'&':'?')+'voltar='+Date.now());}
    catch(e){location.href=appUrl;}
  }
  function reportPrint(){
    try{if(parent&&parent.printReportView){parent.printReportView();return;}}catch(e){}
    const msg=document.getElementById('printHelp');
    if(msg){msg.className='printHelp';msg.textContent='A abrir as opções de impressão...';}
    let printed=false;
    const markPrinted=()=>{printed=true;if(msg)msg.textContent='Escolhe “Guardar como PDF” na janela de impressão.';};
    try{window.addEventListener('afterprint',markPrinted,{once:true});}catch(e){}
    try{window.focus();window.print();}
    catch(err){if(msg){msg.className='printHelp warn';msg.textContent='Este browser bloqueou a impressão. Usa o menu do browser: Partilhar / Imprimir / Guardar como PDF.';}}
    setTimeout(()=>{if(!printed&&msg){msg.className='printHelp warn';msg.textContent='Se nada abriu, este navegador bloqueou a impressão. Abre o ficheiro no Chrome e volta a tentar.';}},1400);
  }
  function reportEmail(){
    try{if(parent&&parent.reportEmail){parent.reportEmail();return;}}catch(e){}
    location.href='mailto:?subject='+encodeURIComponent(emailSubject)+'&body='+encodeURIComponent(emailBody);
  }
<\/script>
  <div class="header"><div>${costaLogo?`<img src="${costaLogo}">`:""}</div><div><div class="title">Relatório de Visita</div><div class="sub">Supervisão de Segurança</div></div><div>${tecLogo?`<img src="${tecLogo}">`:""}<div class="date">${esc(formatDatePT(d.data))}${d.hora?` · ${esc(d.hora)}`:""}<div class="pdfWatermark"></div></div></div></div>
  ${reportIdHtml?`<div class="bar">Identificação</div><div class="idGrid">${reportIdHtml}</div>`:""}
  <div class="bar">Apreciação global</div><p>${esc(appraisal)}</p>
  <div class="stats"><div class="stat"><strong>${nokCount}</strong>NOK</div><div class="stat"><strong>${criticalCount}</strong>Críticos</div><div class="stat"><strong>${counts.ok}</strong>OK</div><div class="stat"><strong>${counts.na}</strong>NA</div><div class="stat"><strong>${counts.missing}</strong>Por responder</div><div class="stat"><strong>${counts.total}</strong>Verificações</div></div>
  ${riskSummaryHtml?`<div class="riskLine"><strong>Riscos NOK:</strong> ${riskSummaryHtml}</div>`:""}
  <div class="bar">Situações NOK / Críticas</div>${nokHtml||"<p>Sem situações NOK registadas.</p>"}
  ${photoHtml?`<div style="break-before:page;page-break-before:always"><div class="bar">Registo fotográfico NOK</div>${skippedPhotos?`<p><strong>Nota:</strong> foram omitidas ${skippedPhotos} fotografia(s) para evitar bloqueio no telemóvel. As restantes ficam guardadas na visita.</p>`:""}<div class="photoGrid">${photoHtml}</div></div>`:""}
  <div class="bar">Observações finais</div><p>${esc(d.obsGerais||"Nada a registar.")}</p><div class="footer">${issuedBy?`Relatório emitido por ${esc(issuedBy)} · `:""}Documento emitido no âmbito da visita de supervisão de segurança em obra.</div></body></html>`;
  openReportInSameTab(reportHtml);
}

document.addEventListener("input",e=>{if(e.target&&e.target.id==="itemSearch")applyItemSearch();if(e.target&&e.target.id==="lote")updateEEFromLote(false);if(e.target&&e.target.id==="entidade")e.target.dataset.auto="false";if(e.target&&(e.target.id==="data"||e.target.id==="hora"))refreshTopDate();if(e.target&&e.target.id!=="itemSearch"&&e.target.type!=="file")scheduleAutosave();});
document.addEventListener("change",e=>{if(e.target&&e.target.id==="lote")updateEEFromLote(false);if(e.target&&e.target.id==="emitido")rememberIssuer();if(e.target&&(e.target.id==="data"||e.target.id==="hora"))refreshTopDate();if(e.target&&e.target.type!=="file")scheduleAutosave();});
window.addEventListener("pagehide",autosaveLight);
window.addEventListener("beforeunload",autosaveLight);

async function bootstrapApp(){
  loadThemePreference();
  await loadRiskCategories();
  loadData();
  applyRememberedIssuer();
  updateEEFromLote(false);
  ensureDateValue();
  ensureTimeValue();
  refreshTopDate();
  render();
  updateRestoreNotice();
}
bootstrapApp();
