/* ThợViệt – file dùng chung cho cả 3 trang.
   TẤT CẢ thao tác dữ liệu (đọc/ghi tài khoản, phiên, hồ sơ thợ, dự án, báo giá, đánh giá) đi qua
   load()/put()/save() ở đây. Sau này thay bằng Supabase/Firebase thì chỉ cần sửa file này. */

const CATS=["Thợ cơ khí","Thợ điện","Kỹ sư công trình"],ICON={"Thợ cơ khí":"⚙️","Thợ điện":"⚡","Kỹ sư công trình":"🏗️"};
const GR=["linear-gradient(135deg,#fde68a,#f59e0b)","linear-gradient(135deg,#bfdbfe,#3b82f6)","linear-gradient(135deg,#bbf7d0,#22c55e)","linear-gradient(135deg,#fbcfe8,#ec4899)"];
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const avg=w=>w.reviews.length?w.reviews.reduce((a,r)=>a+r.s,0)/w.reviews.length:0,stars=n=>"★".repeat(Math.round(n))+"☆".repeat(5-Math.round(n));
const catOpts=a=>(a?'<option value="">Tất cả ngành</option>':"")+CATS.map(c=>`<option>${c}</option>`).join("");
const rd=(f,cb)=>{if(!f)return;const r=new FileReader;r.onload=()=>cb(r.result);r.readAsDataURL(f)};
const load=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}},put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){if(k==="tv_db")alert("Bộ nhớ trình duyệt đã đầy nên chưa lưu được. Hãy dùng ít ảnh hơn hoặc xoá bớt (bản demo). Khi gắn database sẽ không còn giới hạn này.")}};
const sload=k=>{try{return JSON.parse(sessionStorage.getItem(k)||"null")}catch(e){return null}},sput=(k,v)=>{try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const gal=w=>`<div class="gal">${w.gallery.map((g,i)=>`<div class="ph" style="background:${GR[i%4]}">${g.src?`<img src="${g.src}" alt="">`:g.e}<small>${esc(g.t)}</small></div>`).join("")||'<span class="mu">Chưa có ảnh.</span>'}</div>`;
const revs=w=>w.reviews.map(r=>`<div class="rv"><b>${esc(r.n)}</b> <span class="st">${stars(r.s)}</span> <span class="mu">${r.d}</span><div>${esc(r.t)}</div>${r.img?`<img src="${r.img}" alt="">`:""}</div>`).join("")||'<span class="mu">Chưa có đánh giá.</span>';
const ini=n=>esc(n.trim().split(" ").pop()[0]||"?");
const W0=[
{id:1,email:"",name:"Nguyễn Văn Hùng",cat:"Thợ điện",city:"TP.HCM",rate:"600.000đ/công",exp:12,bio:"Chuyên thi công điện dân dụng, tủ điện công nghiệp, camera và điện năng lượng mặt trời.",skills:["Tủ điện","Điện mặt trời","Camera"],gallery:[{e:"⚡",t:"Tủ điện nhà xưởng"},{e:"💡",t:"Điện chiếu sáng văn phòng"},{e:"☀️",t:"Lắp pin mặt trời"}],reviews:[{n:"Công ty An Phát",s:5,t:"Làm nhanh, đi dây gọn gàng, nghiệm thu đúng hẹn.",d:"12/10/2026"},{n:"Chị Lan",s:4,t:"Thợ nhiệt tình, giá hợp lý.",d:"28/09/2026"}]},
{id:2,email:"",name:"Trần Quốc Bảo",cat:"Thợ cơ khí",city:"Đà Nẵng",rate:"550.000đ/công",exp:9,bio:"Hàn TIG/MIG, gia công inox, sửa chữa máy công nghiệp, bảo trì dây chuyền.",skills:["Hàn TIG","Gia công inox","Bảo trì máy"],gallery:[{e:"🔩",t:"Khung inox nhà hàng"},{e:"🛠️",t:"Sửa hộp số"}],reviews:[{n:"Xưởng Minh Phúc",s:5,t:"Mối hàn đẹp, chắc chắn. Sẽ thuê lại.",d:"05/10/2026"}]},
{id:3,email:"",name:"Lê Thị Mai",cat:"Kỹ sư công trình",city:"Hà Nội",rate:"1.200.000đ/công",exp:8,bio:"Giám sát thi công, bóc tách khối lượng, thiết kế kết cấu nhà dân và nhà xưởng.",skills:["Giám sát","Bóc tách KL","Kết cấu"],gallery:[{e:"🏗️",t:"Giám sát nhà 4 tầng"},{e:"📐",t:"Bản vẽ kết cấu"}],reviews:[{n:"Anh Dũng",s:5,t:"Chuyên nghiệp, báo cáo rõ ràng từng hạng mục.",d:"20/10/2026"}]}];
const J0=[
{id:1,title:"Đi dây điện xưởng 300m²",cat:"Thợ điện",city:"Bình Dương",budget:"600.000đ/công",days:"10 công",desc:"Thi công điện 3 pha, lắp tủ phân phối, cần xong trong 2 tuần.",by:"",byName:"Công ty Hưng Thịnh",chosen:0,bids:[]},
{id:2,title:"Hàn khung thép mái che 60m²",cat:"Thợ cơ khí",city:"Đà Nẵng",budget:"550.000đ/công",days:"6 công",desc:"Có sẵn bản vẽ, vật tư chủ nhà lo.",by:"",byName:"Anh Khoa",chosen:0,bids:[]},
{id:3,title:"Giám sát thi công nhà phố 3 tầng",cat:"Kỹ sư công trình",city:"Hà Nội",budget:"1.000.000đ/công",days:"40 công",desc:"Giám sát 4 tháng, báo cáo hàng tuần.",by:"",byName:"Chị Hà",chosen:0,bids:[]}];
let DB=load("tv_db")||{workers:W0,jobs:J0},S=sload("tv_session");
const save=()=>put("tv_db",DB),DEF={biz:"tho",tho:"viec"},ALLOW={biz:["tho","duan","dangduan"],tho:["viec","bao","gianhang"]};
const NAV={biz:[["tho","Tìm thợ"],["duan","Dự án của tôi"],["dangduan","Đăng dự án"]],tho:[["viec","Tìm việc"],["bao","Báo giá của tôi"],["gianhang","Gian hàng của tôi"]]};
const myShop=()=>DB.workers.find(w=>w.email===S.email),wid=id=>DB.workers.find(w=>w.id===id);


const DEST={tho:"worker.html",biz:"owner.html"};
function logout(){try{sessionStorage.removeItem("tv_session")}catch(e){}location.href="index.html"}
function guard(role){if(!S||S.role!==role){location.replace(S&&DEST[S.role]?DEST[S.role]:"index.html");return false}return true}
function navHtml(role,h,isW){return `<span class="logo">${role==="biz"?"🏢":"🔧"} ThợViệt</span>${NAV[role].map(([k,t])=>`<a class="t ${h===k||(k==="tho"&&isW)?"on":""}" href="#${k}">${t}</a>`).join("")}<span class="mu">${esc(S.name)}</span><a class="t" href="#" onclick="logout();return false">Đăng xuất</a>`}

/* ---------- CHAT (góc phải màn hình, dùng cho cả thợ và chủ) ---------- */
let CH={open:false,cur:null};
const mySide=()=>S.role==="biz"?"o":"w",otherName=c=>S.role==="biz"?c.workerName:c.ownerName;
const lastTs=c=>c.msgs.length?c.msgs[c.msgs.length-1].ts:0,unread=c=>c.msgs.filter(m=>m.f!==mySide()&&m.ts>((c.seen||{})[mySide()]||0)).length;
function myConvs(){const me=S.role==="tho"?myShop():null;return(DB.convs||[]).filter(c=>S.role==="biz"?c.owner===S.email:me&&c.worker===me.id).sort((a,b)=>lastTs(b)-lastTs(a))}
function chatInit(){if(!S||document.getElementById("cd"))return;const d=document.createElement("div");d.id="cd";document.body.appendChild(d);chatDraw();
addEventListener("storage",e=>{if(e.key==="tv_db"){DB=load("tv_db")||DB;chatDraw()}})}
function startConv(oe,on,wId,offer){DB=load("tv_db")||DB;DB.convs=DB.convs||[];const w=wid(wId);let c=DB.convs.find(x=>x.owner===oe&&x.worker===wId);
if(!c){c={id:"c"+Date.now(),owner:oe,ownerName:on,worker:wId,workerName:w.name,msgs:[],seen:{}};DB.convs.push(c);save()}
CH={open:true,cur:c.id};if(offer)pushMsg(c.id,{f:"o",t:"",offer});else chatDraw()}
const openChat=(wId,offer)=>startConv(S.email,S.name,wId,offer);
function chatOwner(jid){const j=DB.jobs.find(x=>x.id===jid),me=myShop();if(!j||!j.by||!me)return;startConv(j.by,j.byName,me.id)}
function pushMsg(cid,m){DB=load("tv_db")||DB;const c=(DB.convs||[]).find(x=>x.id===cid);if(!c)return;m.ts=Date.now();c.msgs.push(m);c.seen=c.seen||{};c.seen[m.f]=m.ts;save();chatDraw()}
function chatSend(){const i=$("#ci"),t=i.value.trim();if(!t)return;i.value="";pushMsg(CH.cur,{f:mySide(),t})}
function offerAns(cid,i,ok){DB=load("tv_db")||DB;const c=DB.convs.find(x=>x.id===cid),o=c.msgs[i].offer;if(o.st!=="pending")return;o.st=ok?"ok":"no";
if(ok){const w=wid(c.worker);w.active=w.active||[];w.active.push({cid:c.id,job:o.job,jobId:o.jobId||0,client:c.ownerName,price:o.price})}
if(ok&&o.jobId){const j=DB.jobs.find(x=>x.id===o.jobId);if(j)j.chosen=c.worker}save();pushMsg(cid,{f:"w",t:ok?"Mình nhận việc này nhé! ✅":"Xin lỗi, mình chưa nhận được việc này."})}
const chatToggle=()=>{CH.open=!CH.open;chatDraw()},chatOpen=id=>{CH.cur=id;chatDraw()},chatBack=()=>{CH.cur=null;chatDraw()},chatClose=()=>{CH.open=false;chatDraw()};
function bub(c,m,i){const mine=m.f===mySide(),o=m.offer;if(!o)return`<div class="cm ${mine?"me":""}"><div class="bb">${esc(m.t)}</div></div>`;
const st=o.st==="ok"?"✅ Thợ đã nhận việc":o.st==="no"?"❌ Thợ đã từ chối":o.st==="cancel"?"⚠️ Thợ đã huỷ nhận việc":S.role==="tho"?`<button class="btn" onclick="offerAns('${c.id}',${i},true)">Nhận việc</button> <button class="btn g" onclick="offerAns('${c.id}',${i},false)">Từ chối</button>`:"⏳ Đang chờ thợ phản hồi";
return`<div class="cm ${mine?"me":""}"><div class="bb of"><b>📩 Đề nghị thuê</b><br>${esc(o.job)}<br>💰 ${o.price?esc(o.price):"Thỏa thuận"}${o.days?" · "+esc(o.days):""}${o.note?`<br><i>${esc(o.note)}</i>`:""}<div style="margin-top:6px">${st}</div></div></div>`}
function chatDraw(){const d=document.getElementById("cd");if(!d||!S)return;const old=($("#ci")||{}).value||"",cs=myConvs(),tot=cs.reduce((a,c)=>a+unread(c),0);let p="";
if(CH.open){const c=cs.find(x=>x.id===CH.cur);
if(c){if(unread(c)){c.seen=c.seen||{};c.seen[mySide()]=Date.now();save()}const demo=S.role==="biz"&&(wid(c.worker)||{}).email==="";
p=`<div class="ch"><span onclick="chatBack()">←</span><span style="flex:1">${esc(otherName(c))}</span><span onclick="chatClose()">✕</span></div><div class="cl" id="cm">${demo?'<div class="mu" style="font-size:12px;text-align:center">Thợ mẫu trong bản demo, sẽ không có người trả lời.</div>':""}${c.msgs.map((m,i)=>bub(c,m,i)).join("")||'<div class="mu" style="text-align:center;margin-top:20px">Hãy gửi lời chào đầu tiên 👋</div>'}</div><div class="cf"><input id="ci" placeholder="Aa" autocomplete="off"><button class="btn" onclick="chatSend()">Gửi</button></div>`}
else p=`<div class="ch"><span style="flex:1">Tin nhắn</span><span onclick="chatClose()">✕</span></div><div class="cl">${cs.map(c=>{const u=unread(c),l=c.msgs[c.msgs.length-1];return`<div class="ci" onclick="chatOpen('${c.id}')"><div class="av" style="width:40px;height:40px;font-size:16px">${ini(otherName(c))}</div><div style="min-width:0;flex:1"><b>${esc(otherName(c))}</b>${u?`<span class="bg">${u}</span>`:""}<div class="mu" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l?esc(l.offer?"📩 Đề nghị thuê: "+l.offer.job:l.t):"Chưa có tin nhắn"}</div></div></div>`}).join("")||'<p class="mu" style="text-align:center;margin-top:30px">Chưa có cuộc trò chuyện nào.</p>'}</div>`;
p=`<div id="cp">${p}</div>`}
d.innerHTML=p+`<button class="btn" id="cb" onclick="chatToggle()">💬 Tin nhắn${tot?`<span class="bg">${tot}</span>`:""}</button>`;
const m=$("#cm");if(m)m.scrollTop=m.scrollHeight;const i=$("#ci");if(i){i.value=old;i.focus();i.onkeydown=e=>{if(e.key==="Enter")chatSend()}}}

/* ---------- TRẠNG THÁI THỢ: Đang rảnh / Đang nhận việc ---------- */
const badge=w=>(w.busy||(w.active&&w.active.length))?'<span class="tag" style="color:var(--ac);border-color:var(--ac)">🟠 Đang nhận việc</span>':'<span class="tag" style="color:#2a9d4a;border-color:#2a9d4a">🟢 Đang rảnh</span>';

const hasWork=(wId,jId)=>((wid(wId)||{}).active||[]).some(a=>a.jobId===jId);
function ensureConv(oe,on,wId){DB.convs=DB.convs||[];let c=DB.convs.find(x=>x.owner===oe&&x.worker===wId);if(!c){c={id:"c"+Date.now(),owner:oe,ownerName:on,worker:wId,workerName:wid(wId).name,msgs:[],seen:{}};DB.convs.push(c)}return c}

/* ---------- TỈNH/THÀNH (34 đơn vị sau sáp nhập 2025) + Ô NHẬP TIỀN ---------- */
const PROV=[["Hà Nội"],["Hồ Chí Minh","TP.HCM|TP HCM|HCM|Sài Gòn|Bà Rịa - Vũng Tàu|Bình Dương"],["Hải Phòng","Hải Dương"],["Đà Nẵng","Quảng Nam"],["Cần Thơ","Sóc Trăng|Hậu Giang"],["Huế"],
["Tuyên Quang","Hà Giang"],["Lào Cai","Yên Bái"],["Thái Nguyên","Bắc Kạn"],["Phú Thọ","Vĩnh Phúc|Hòa Bình"],["Bắc Ninh","Bắc Giang"],["Hưng Yên","Thái Bình"],["Ninh Bình","Hà Nam|Nam Định"],["Quảng Trị","Quảng Bình"],["Quảng Ngãi","Kon Tum"],["Gia Lai","Bình Định"],["Khánh Hòa","Ninh Thuận"],["Lâm Đồng","Đắk Nông|Bình Thuận"],["Đắk Lắk","Phú Yên"],["Đồng Nai","Bình Phước"],["Tây Ninh","Long An"],["Vĩnh Long","Bến Tre|Trà Vinh"],["Đồng Tháp","Tiền Giang"],["Cà Mau","Bạc Liêu"],["An Giang","Kiên Giang"],
["Cao Bằng"],["Lạng Sơn"],["Quảng Ninh"],["Điện Biên"],["Lai Châu"],["Sơn La"],["Thanh Hóa"],["Nghệ An"],["Hà Tĩnh"]];
const normCity=v=>{const k=String(v||"").toLowerCase().replace(/^(tỉnh|thành phố)\s+/,"").trim(),p=PROV.find(([n,o])=>n.toLowerCase()===k||(o||"").toLowerCase().split("|").includes(k));return p?p[0]:v},cityOk=v=>PROV.some(p=>p[0]===v);
const cityInp=(id,val)=>`<input id="${id}" list="pv" autocomplete="off" placeholder="Chọn hoặc gõ để tìm tỉnh/thành" value="${esc(normCity(val||""))}"><datalist id="pv">${PROV.map(([n,o])=>`<option value="${n}"${o?` label="${n} (gồm ${o.split("|").join(", ")})"`:""}>`).join("")}</datalist>`;
const provSel=()=>'<option value="">Tất cả tỉnh/thành</option>'+PROV.map(p=>`<option>${p[0]}</option>`).join("");
const dots=s=>String(s).replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
const moneyInp=(id,val,ph)=>`<div class="mi"><input id="${id}" inputmode="numeric" autocomplete="off" placeholder="${ph||"VD: 600.000"}" value="${dots(val||"")}" oninput="this.value=dots(this.value)"><span>đ/công</span></div>`;
const moneyVal=id=>{const d=dots((document.getElementById(id)||{}).value||"");return d?d+"đ/công":""};
const fld=(l,h)=>`<label class="fl"><span>${l}</span>${h}</label>`;

/* ---------- DANH SÁCH KỸ NĂNG THEO NGÀNH ---------- */
const SKILLS={
"Thợ cơ khí":["Hàn TIG","Hàn MIG/MAG","Hàn que","Hàn nhôm","Hàn ống/đường ống","Tiện","Phay","Bào","Mài","Gia công CNC","Gia công inox","Gia công sắt thép","Cắt laser/plasma","Chấn gấp tôn","Làm khung thép/mái che","Cửa sắt/cổng/hàng rào","Lan can/cầu thang sắt","Đọc bản vẽ cơ khí","Bảo trì máy","Sửa chữa máy công nghiệp","Sửa động cơ/hộp số","Thủy lực – khí nén","Lắp đặt dây chuyền","Sửa chữa ô tô","Sửa chữa xe máy","Lắp đặt cân/băng tải"],
"Thợ điện":["Điện dân dụng","Điện công nghiệp","Đi dây âm tường","Điện 3 pha","Tủ điện","Lắp tủ phân phối","Điện chiếu sáng","Điện mặt trời","Camera","Mạng LAN/Wifi","Điện nhẹ","Chống sét – tiếp địa","Báo cháy – PCCC","Điều hòa – điện lạnh","Máy phát điện","Bơm nước – động cơ điện","PLC/tự động hóa","Sửa thiết bị điện","Lắp thang máy","Đọc bản vẽ điện","Đấu nối trạm biến áp","Đo kiểm – nghiệm thu điện"],
"Kỹ sư công trình":["Giám sát","Bóc tách KL","Kết cấu","Thiết kế kiến trúc","Dự toán","Quản lý dự án","An toàn lao động","Nghiệm thu – hoàn công","Khảo sát địa chất","Thi công móng/cọc","Bê tông cốt thép","Xây dựng dân dụng","Nhà xưởng – kết cấu thép","Cầu đường","Cấp thoát nước","Hệ thống MEP","AutoCAD","Revit","SAP2000/ETABS","Xin phép xây dựng","Cải tạo – sửa chữa nhà","Chống thấm"]};
const skillTags=(a,n)=>a.length?a.slice(0,n).map(s=>`<span class="tag">${esc(s)}</span>`).join("")+(a.length>n?`<span class="tag">+${a.length-n}</span>`:""):'<span class="tag">Chưa cập nhật kỹ năng</span>';

/* ---------- HỒ SƠ NĂNG LỰC KIỂU CV (kinh nghiệm, học vấn, chứng chỉ, giải thưởng, người tham chiếu) ---------- */
const SEC=[
{k:"work",t:"Kinh nghiệm làm việc",add:"+ Thêm kinh nghiệm",f:[["co","Công ty / Công trình / Nơi làm việc"],["role","Vị trí / Công việc đảm nhận"],["from","Từ (VD: 03/2020)","h"],["to","Đến (bỏ trống nếu đang làm)","h"],["desc","Mô tả công việc, thành tích","a"]]},
{k:"edu",t:"Học vấn & đào tạo",add:"+ Thêm trường/khoá học",f:[["school","Trường / Trung tâm đào tạo"],["major","Ngành / Chuyên môn"],["from","Từ năm","h"],["to","Đến năm","h"]]},
{k:"cert",t:"Chứng chỉ & bằng cấp",add:"+ Thêm chứng chỉ",f:[["name","Tên chứng chỉ (VD: Chứng chỉ an toàn điện, Hàn 3G)"],["year","Năm cấp","h"],["by","Nơi cấp","h"]]},
{k:"award",t:"Danh hiệu & giải thưởng",add:"+ Thêm giải thưởng",f:[["year","Năm","h"],["text","Danh hiệu / giải thưởng"]]},
{k:"ref",t:"Người tham chiếu",add:"+ Thêm người tham chiếu",f:[["name","Họ tên"],["role","Chức vụ / Công ty"],["phone","Số điện thoại"]]}];
const fh=(l,h)=>`<label class="fl h"><span>${l}</span>${h}</label>`;
const avh=(w,st)=>w.photo?`<div class="av" style="${st||""};background:url(${w.photo}) center top/cover;color:transparent">${ini(w.name)}</div>`:`<div class="av" style="${st||""}">${ini(w.name)}</div>`;
const shrinkSq=(src,n,cb)=>{const i=new Image();i.onload=()=>{const s=Math.min(i.width,i.height),c=document.createElement("canvas");c.width=c.height=n;c.getContext("2d").drawImage(i,(i.width-s)/2,(i.height-s)/2,s,s,0,0,n,n);cb(c.toDataURL("image/jpeg",.85))};i.src=src};
function itemHtml(k,it,ph){const e=x=>esc(it[x]||""),per=it.from||it.to?`<div class="mu">${e("from")} – ${it.to?e("to"):"Hiện tại"}</div>`:"";
if(k==="work")return`<div class="it"><b>${e("co")}</b>${it.role?" – "+e("role"):""}${per}${it.desc?`<div class="pre">${e("desc")}</div>`:""}</div>`;
if(k==="edu")return`<div class="it"><b>${e("school")}</b>${it.major?`<div>${e("major")}</div>`:""}${per}</div>`;
if(k==="cert")return`<div class="it"><b>${e("name")}</b><div class="mu">${[e("year"),e("by")].filter(Boolean).join(" · ")}</div></div>`;
if(k==="award")return`<div class="it"><b>${e("year")}</b> ${e("text")}</div>`;
return`<div class="it"><b>${e("name")}</b>${it.role?" · "+e("role"):""}${ph&&it.phone?`<div class="mu">📞 ${e("phone")}</div>`:""}</div>`}
function cvView(w,own){const has=SEC.some(s=>(w[s.k]||[]).length),ph=own||w.pub,
ct=[w.gender,w.byear?"Sinh năm "+w.byear:"",w.pub&&w.phone?"📞 "+w.phone:"",w.pub&&w.email?"✉️ "+w.email:""].filter(Boolean).map(esc).join(" · ");
if(!has&&!ct)return own?'<div class="card mu" style="margin-top:12px">Hồ sơ chi tiết còn trống. Bấm "Sửa thông tin" để thêm kinh nghiệm, học vấn, chứng chỉ… giúp chủ dự án tin tưởng bạn hơn.</div>':"";
return`<div class="cv" style="margin-top:12px"><div class="cvh"><b style="font-size:17px">Hồ sơ năng lực</b></div><div class="cvb" style="padding-bottom:18px">${ct||!w.pub?`<div>${ct}${w.pub?"":` <span class="mu">${ct?"· ":""}🔒 Liên hệ qua tin nhắn trên ThợViệt</span>`}</div>`:""}${SEC.map(s=>(w[s.k]||[]).length?`<div class="cvs"><h3>${s.t}</h3>${w[s.k].map(it=>itemHtml(s.k,it,ph)).join("")}</div>`:"").join("")}</div></div>`}

/* ---------- TRANG HỒ SƠ KHỔ DỌC (dùng cho Gian hàng của tôi và khi chủ xem hồ sơ thợ) ---------- */
function cvPage(w,o){o=o||{};const own=o.own,has=SEC.some(s=>(w[s.k]||[]).length),ph=own||w.pub,
ct=[w.gender,w.byear?"Sinh năm "+w.byear:"",w.pub&&w.phone?"📞 "+w.phone:"",w.pub&&w.email?"✉️ "+w.email:""].filter(Boolean).map(esc).join(" · "),lock=!w.pub&&!own;
return`<div class="cv"><div class="cvh cvp"><div class="pf" onclick="zoomImg(this)" title="Bấm để xem ảnh lớn">${w.photo?`<img src="${w.photo}" alt="">`:ini(w.name)}</div><div style="flex:1;min-width:0"><div style="font-size:22px;font-weight:800;line-height:1.25">${esc(w.name)}</div><div>${ICON[w.cat]} ${w.cat}</div><div>📍 ${esc(normCity(w.city))} · ${w.exp} năm kinh nghiệm</div><div style="margin-top:2px">★ <b>${avg(w).toFixed(1)}</b> (${w.reviews.length} đánh giá)</div></div></div>
<div class="cvb"><div class="bd"><div><b style="font-size:19px">${rateTxt(w)}</b> ${badge(w)}</div><span>${o.act||""}</span></div>${o.top||""}${own&&!w.photo?'<div class="mu">📷 Hãy thêm ảnh chân dung rõ mặt (bấm Sửa thông tin) để chủ dự án tin tưởng hơn.</div>':""}${ct||lock?`<div class="mu">${ct}${lock?(ct?" · ":"")+"🔒 Liên hệ qua tin nhắn trên ThợViệt":""}</div>`:""}
<div class="cvs"><h3>Kỹ năng</h3><div>${skillTags(w.skills,99)}</div></div>${w.bio?`<div class="cvs"><h3>Giới thiệu</h3><div class="pre">${esc(w.bio)}</div></div>`:""}
${SEC.map(s=>(w[s.k]||[]).length?`<div class="cvs"><h3>${s.t}</h3>${w[s.k].map(it=>itemHtml(s.k,it,ph)).join("")}</div>`:"").join("")}${own&&!has?'<div class="mu">Hồ sơ chi tiết còn trống. Bấm "Sửa thông tin" để thêm kinh nghiệm, học vấn, chứng chỉ… giúp chủ dự án tin tưởng bạn hơn.</div>':""}
${albSec(w,own)}<div class="cvs" style="padding-bottom:12px"><h3>Đánh giá (${w.reviews.length})</h3>${o.rev||""}${revs(w)}</div></div></div>`}

/* ---------- ẢNH CHÂN DUNG LỚN ---------- */
const shrinkPortrait=(src,W,H,cb)=>{const i=new Image();i.onload=()=>{const r=W/H;let cw=i.width,ch=i.height;if(cw/ch>r)cw=ch*r;else ch=cw/r;const c=document.createElement("canvas");c.width=W;c.height=H;c.getContext("2d").drawImage(i,(i.width-cw)/2,(i.height-ch)*0.2,cw,ch,0,0,W,H);cb(c.toDataURL("image/jpeg",.85))};i.src=src};
const cph=w=>`<div class="cph">${w.photo?`<img src="${w.photo}" alt="">`:`<span>${ini(w.name)}</span>`}</div>`;
function zoomImg(el){const i=el.querySelector("img");if(!i)return;const d=document.createElement("div");d.className="zm";d.innerHTML=`<img src="${i.src}" alt="">`;d.onclick=()=>d.remove();document.body.appendChild(d)}

/* ---------- THƯ MỤC CÔNG TRÌNH (mỗi công trình nhiều ảnh, mỗi ảnh có ghi chú) ---------- */
const fmtMY=s=>/^\d{1,2}\/\d{4}$/.test(s)?"Tháng "+s:s;
const ROLES=["Tôi tự làm toàn bộ","Tôi làm một phần công việc","Tôi làm trong tổ đội / giám sát"];
const albumsOf=w=>(w.albums||[]).concat(w.gallery&&w.gallery.length?[{id:"legacy",title:"Ảnh công trình",desc:"",photos:w.gallery.map(g=>({src:g.src,e:g.e,note:g.t}))}]:[]);
const phTile=p=>p&&p.src?`<img src="${p.src}" alt="">`:`<span style="font-size:34px">${(p&&p.e)||"🖼️"}</span>`;
const shrinkMax=(src,n,cb)=>{const i=new Image();i.onload=()=>{const r=Math.min(1,n/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=Math.round(i.width*r);c.height=Math.round(i.height*r);c.getContext("2d").drawImage(i,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.78))};i.src=src};
function migrateGallery(w){if(w.gallery&&w.gallery.some(g=>g.src)){w.albums=w.albums||[];w.albums.push({id:"a"+Date.now(),title:"Ảnh công trình",place:"",year:"",role:ROLES[0],desc:"",photos:w.gallery.filter(g=>g.src).map(g=>({src:g.src,note:g.t==="Công trình mới"?"":g.t}))});w.gallery=w.gallery.filter(g=>!g.src);save()}}
function albumCard(w,a,own){const c=a.photos.find(p=>p.src)||a.photos[0]||{};
return`<div class="acd" onclick="openAlbum(${w.id},'${a.id}')"><div class="pt" style="${c.src?"":"background:"+GR[0]}">${phTile(c)}</div><div class="atx"><b>📁 ${esc(a.title)}</b><div class="am-c">${[a.place&&"📍 "+esc(normCity(a.place)),a.year&&"🕒 "+esc(a.year)].filter(Boolean).join(" · ")}</div><div class="mu">📁 ${a.photos.length} ảnh</div>${own&&a.id!=="legacy"?`<div class="ab"><button class="btn g" onclick="event.stopPropagation();albumEdit('${a.id}')">✏️ Sửa</button><button class="btn g" onclick="event.stopPropagation();albumDel('${a.id}')">🗑</button></div>`:""}</div></div>`}
function albSec(w,own){const al=albumsOf(w);return`<div class="cvs"><h3>Công trình đã làm (${al.length})</h3>${own?'<div class="mu" style="margin-bottom:8px">💡 Mỗi công trình là một thư mục chứa nhiều ảnh. Hãy ghi chú thật cho từng ảnh (bạn làm phần nào, bao lâu, làm cùng ai) để chủ dự án tin tưởng.</div>':""}${al.length?`<div class="agr2">${al.map(a=>albumCard(w,a,own)).join("")}</div>`:`<div class="mu">${own?"Chưa có công trình nào.":"Thợ chưa đăng ảnh công trình."}</div>`}${own?'<div style="margin-top:10px"><button class="btn g" onclick="albumEdit(null)">+ Tạo thư mục công trình mới</button></div>':""}</div>`}
const mclose=()=>{const d=document.getElementById("mdl");if(d)d.remove()};
function openAlbum(wId,aid){const w=wid(wId),a=albumsOf(w).find(x=>x.id===aid);if(!a)return;mclose();const d=document.createElement("div");d.className="am";d.id="mdl";d.onclick=e=>{if(e.target===d)mclose()};
d.innerHTML=`<div class="amp"><div class="bd"><b style="font-size:18px">📁 ${esc(a.title)}</b><span class="x2" onclick="mclose()">✕</span></div><div class="mt">${[normCity(a.place||""),a.addr].filter(Boolean).length?`<span>📍 ${esc([normCity(a.place||""),a.addr].filter(Boolean).join(" – "))}</span>`:""}${a.year?`<span>🕒 ${esc(fmtMY(a.year))}</span>`:""}</div>${a.role?`<span class="tag">🛠️ ${esc(a.role)}</span>`:""}${a.desc?`<div class="pre" style="margin:8px 0">${esc(a.desc)}</div>`:""}<div class="agr">${a.photos.map((p,i)=>`<div><div class="pt" style="${p.src?"":"background:"+GR[i%4]}" onclick="openPhoto(${wId},'${aid}',${i})">${phTile(p)}</div>${p.note?`<div class="pn">${esc(p.note)}</div>`:'<div class="pn mu">Không có ghi chú</div>'}</div>`).join("")}</div></div>`;document.body.appendChild(d)}
let LB=null;
function openPhoto(wId,aid,i){const a=albumsOf(wid(wId)).find(x=>x.id===aid);if(!a)return;LB={a,i};lbDraw()}
function lbDraw(){let d=document.getElementById("lbx");if(!d){d=document.createElement("div");d.id="lbx";d.className="zm";d.onclick=e=>{if(e.target===d)lbClose()};document.body.appendChild(d)}
const p=LB.a.photos[LB.i],n=LB.a.photos.length;
d.innerHTML=`<div class="lbw">${p.src?`<img src="${p.src}" alt="">`:`<div class="pt" style="font-size:80px;background:${GR[0]};width:60vw;max-width:420px">${p.e||"🖼️"}</div>`}<div class="lbc"><b>${esc(LB.a.title)}</b> · ${LB.i+1}/${n}<div>${p.note?esc(p.note):'<span style="opacity:.7">Không có ghi chú</span>'}</div></div>${n>1?'<button class="lbn l" onclick="lbGo(-1)">‹</button><button class="lbn r" onclick="lbGo(1)">›</button>':""}<button class="lbn x" onclick="lbClose()">✕</button></div>`}
const lbGo=s=>{LB.i=(LB.i+s+LB.a.photos.length)%LB.a.photos.length;lbDraw()},lbClose=()=>{const d=document.getElementById("lbx");if(d)d.remove();LB=null};
addEventListener("keydown",e=>{if(!LB)return;if(e.key==="Escape")lbClose();if(e.key==="ArrowRight")lbGo(1);if(e.key==="ArrowLeft")lbGo(-1)});
/* --- soạn thư mục (chỉ thợ) --- */
let AE=null;
function albumEdit(id){const a=id&&(myShop().albums||[]).find(x=>x.id===id);AE=a?JSON.parse(JSON.stringify(a)):{id:null,title:"",place:"",year:"",role:ROLES[0],desc:"",photos:[]};aeDraw()}
function aeSync(){if(!$("#ae-t"))return;AE.title=$("#ae-t").value;AE.place=$("#ae-p").value;AE.addr=$("#ae-a").value;{const m=$("#ae-m").value,y=$("#ae-yy").value;AE.year=y?(m?m+"/"+y:y):""}AE.role=$("#ae-r").value;AE.desc=$("#ae-d").value;AE.photos.forEach((p,i)=>{const n=$("#ae-n"+i);if(n)p.note=n.value})}
function aeDraw(){let d=document.getElementById("mdl");const old=d&&d.querySelector(".amp"),sc=old?old.scrollTop:0;if(!d){d=document.createElement("div");d.id="mdl";d.className="am";document.body.appendChild(d)}
const pl=normCity(AE.place||""),ps=PROV.map(p=>`<option${p[0]===pl?" selected":""}>${p[0]}</option>`).join("")+(AE.place&&!cityOk(pl)?`<option selected>${esc(AE.place)}</option>`:""),tm=/^(\d{1,2})\/(\d{4})$/.exec(AE.year||"")||[],mm=tm[1]?tm[1].padStart(2,"0"):"",yy=tm[2]||(/^\d{4}$/.test(AE.year||"")?AE.year:""),Y=new Date().getFullYear(),mo=Array.from({length:12},(_,i)=>String(i+1).padStart(2,"0")).map(m=>`<option value="${m}"${m===mm?" selected":""}>Tháng ${m}</option>`).join(""),ys=Array.from({length:Y-1989},(_,i)=>Y-i).map(y=>`<option${String(y)===yy?" selected":""}>${y}</option>`).join("");
d.innerHTML=`<div class="amp"><div class="bd"><b style="font-size:18px">${AE.id?"Sửa":"Tạo"} thư mục công trình</b><span class="x2" onclick="aeClose()">✕</span></div><div class="f">${fld("Tên công trình",`<input id="ae-t" placeholder="VD: Nhà xưởng An Phát – Bình Dương" value="${esc(AE.title)}">`)}${fld("Tỉnh/thành phố làm công trình",`<select id="ae-p"><option value="">— Chọn tỉnh/thành —</option>${ps}</select>`)}${fld("Địa chỉ cụ thể (tuỳ chọn)",`<input id="ae-a" placeholder="VD: KCN Long Thành, xã/phường…" value="${esc(AE.addr||"")}">`)}<div class="fl"><span>Thời gian thực hiện</span><div class="g2"><select id="ae-m"><option value="">Tháng</option>${mo}</select><select id="ae-yy"><option value="">Năm</option>${ys}</select></div></div>${fld("Vai trò của bạn trong công trình",`<select id="ae-r">${ROLES.map(r=>`<option${r===AE.role?" selected":""}>${r}</option>`).join("")}</select>`)}${fld("Mô tả công việc bạn đã làm",`<textarea id="ae-d">${esc(AE.desc)}</textarea>`)}
<div class="fl"><span>Ảnh trong thư mục (${AE.photos.length}/12) – ghi chú thật cho từng ảnh</span></div>${AE.photos.map((p,i)=>`<div class="pe"><div class="pt">${phTile(p)}</div><div><textarea id="ae-n${i}" placeholder="Ghi chú thật: chụp khi nào, bạn làm phần nào, làm bao lâu, làm cùng ai…">${esc(p.note||"")}</textarea><button class="btn g" style="padding:3px 10px;font-size:13px" onclick="aeDel(${i})">🗑 Xoá ảnh</button></div></div>`).join("")}${AE.photos.length<12?'<label class="btn g" style="text-align:center">+ Thêm ảnh (chọn được nhiều ảnh)<input type="file" accept="image/*" multiple id="ae-f" hidden></label>':""}<div class="err" id="ae-e"></div><div style="display:flex;gap:8px"><button class="btn" onclick="aeSave()">Lưu thư mục</button><button class="btn g" onclick="aeClose()">Huỷ</button></div></div></div>`;
const nw=d.querySelector(".amp");if(nw)nw.scrollTop=sc;const f=$("#ae-f");
if(f)f.onchange=e=>{aeSync();const fs=[...e.target.files].slice(0,12-AE.photos.length);let n=fs.length;fs.forEach(x=>rd(x,u=>shrinkMax(u,900,p=>{AE.photos.push({src:p,note:""});if(--n===0)aeDraw()})))}}
const aeClose=()=>{AE=null;mclose()};
function aeDel(i){aeSync();AE.photos.splice(i,1);aeDraw()}
function aeSave(){aeSync();const err=t=>$("#ae-e").textContent=t;if(!AE.title.trim())return err("Hãy nhập tên công trình.");if(!AE.photos.length)return err("Hãy thêm ít nhất 1 ảnh.");
DB=load("tv_db")||DB;const me=myShop();me.albums=me.albums||[];const a={...AE,id:AE.id||"a"+Date.now(),title:AE.title.trim()},i=me.albums.findIndex(x=>x.id===a.id);if(i<0)me.albums.unshift(a);else me.albums[i]=a;save();aeClose();if(typeof vShop==="function")vShop()}
function albumDel(id){if(!confirm("Xoá thư mục công trình này và toàn bộ ảnh bên trong?"))return;DB=load("tv_db")||DB;const me=myShop();me.albums=(me.albums||[]).filter(x=>x.id!==id);save();if(typeof vShop==="function")vShop()}

/* ---------- HIỂN THỊ GIÁ: giá báo sẵn + lương thỏa thuận ---------- */
const rateTxt=w=>(w.rate?esc(w.rate):"")+(w.negot?(w.rate?' <span class="tag" style="border-color:var(--ac);color:var(--ac)">🤝 Thỏa thuận</span>':"Lương thỏa thuận"):"");

/* ---------- TÌM KIẾM KHÔNG PHÂN BIỆT HOA/THƯỜNG, KHÔNG CẦN DẤU + Ô CHỌN GÕ ĐỂ LỌC ---------- */
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/\s+/g," ").trim();
const kwMatch=(text,q)=>{const t=norm(text);return norm(q).split(" ").filter(Boolean).every(k=>t.includes(k))};
const provAlias=n=>{const o=(PROV.find(p=>p[0]===n)||[])[1];return o?"gồm "+o.split("|").join(", "):""};
function comboInit(id,items,val,ph,onpick,alias){const box=document.querySelector("#"+id);if(!box)return;alias=alias||(()=>"");
box.innerHTML=`<input type="text" autocomplete="off" placeholder="${esc(ph)}" value="${esc(val||"")}"><span class="cbx"${val?"":" hidden"}>✕</span><div class="cbl" hidden></div>`;
const inp=box.querySelector("input"),lst=box.querySelector(".cbl"),x=box.querySelector(".cbx");let cur=val||"";
const match=q=>items.filter(s=>kwMatch(s+" "+alias(s),q));
const show=()=>{const q=inp.value===cur?"":inp.value,m=match(q);lst.innerHTML=m.map(s=>`<div class="cbi${s===cur?" on":""}" data-v="${esc(s)}">${esc(s)}${alias(s)?`<small>${esc(alias(s))}</small>`:""}</div>`).join("")||'<div class="cbi" style="color:var(--mu)">Không có kết quả</div>';lst.hidden=false};
const pick=v=>{cur=v;inp.value=v;lst.hidden=true;x.hidden=!v;onpick(v)};
inp.onfocus=()=>{inp.select();show()};inp.oninput=()=>{show();x.hidden=!inp.value};
lst.onmousedown=e=>e.preventDefault();
lst.onclick=e=>{const it=e.target.closest(".cbi");if(it&&it.dataset.v!==undefined)pick(it.dataset.v)};
x.onmousedown=e=>e.preventDefault();x.onclick=()=>pick("");
inp.onblur=()=>{lst.hidden=true;const t=inp.value.trim();if(!t){if(cur)pick("");return}if(t===cur)return;const m=match(t),ex=items.find(s=>norm(s)===norm(t))||(m.length===1?m[0]:null);if(ex)pick(ex);else inp.value=cur};
inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();const f=lst.querySelector(".cbi[data-v]");if(f)pick(f.dataset.v);inp.blur()}if(e.key==="Escape")inp.blur()}}
