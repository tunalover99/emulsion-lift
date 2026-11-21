/* Works. key: "<Tonic> <major|minor>" (e.g. "Eb major", "C# minor"); cat: catalogue ids.
   recs: { p: [performer ids], label, year, why }   am: Apple Music search term. */
OA.works = [
  /* ---------------- BACH ---------------- */
  {
    id: "bach-cello-suite-1", composer: "bach", ko: "무반주 첼로 모음곡 1번", en: "Cello Suite No. 1",
    year: "c. 1717–1723", key: "G major", genre: ["suite"], cat: [{ s: "bwv", t: "BWV 1007" }],
    instr: "첼로 독주",
    movements: [["Prélude", "전주곡"], ["Allemande", "알르망드"], ["Courante", "쿠랑트"], ["Sarabande", "사라반드"], ["Menuet I & II", "미뉴에트"], ["Gigue", "지그"]],
    bg: "쾨텐 궁정 악장 시절에 쓰인 것으로 추정되는 여섯 곡의 모음곡 중 첫 곡입니다. 바흐의 자필 악보는 남아 있지 않고, 두 번째 부인 안나 막달레나의 필사본 등으로 전해집니다. 오랫동안 연습곡 정도로 여겨지다가 [[p:casals|파블로 카잘스]]가 1930년대 녹음으로 세상에 널리 알렸습니다.",
    points: ["프렐류드: 화음을 한 음씩 풀어 연주하는 아르페지오가 선율과 화성을 동시에 만들어 냅니다. 악기 하나로 오케스트라 같은 울림을 상상해 보세요.", "각 춤곡의 템포·박자 대비: 장중한 사라반드와 경쾌한 지그를 비교해 보세요.", "같은 곡이라도 연주자마다 템포와 프레이징이 크게 달라 비교 감상에 특히 좋습니다."],
    recs: [
      { p: ["casals"], label: "EMI (HMV)", year: "1936–39", why: "이 곡을 ‘발견’하게 한 역사적 녹음. 음질은 오래되었지만 해석의 힘과 영향력이 압도적입니다." },
      { p: ["fournier"], label: "DG Archiv", year: "1960", why: "귀족적이고 균형 잡힌 해석으로 오랫동안 표준으로 여겨진 녹음." },
      { p: ["rostropovich"], label: "EMI", year: "1991", why: "프랑스 베즐레 성당에서 녹음. 풍부한 울림과 깊은 서정성." },
      { p: ["yoyoma"], label: "Sony Classical", year: "2018 (Six Evolutions)", why: "세 번째 전곡 녹음. 가볍고 유연한 춤곡의 감각이 돋보입니다." }
    ],
    am: "Bach Cello Suite No. 1 BWV 1007 Prelude", related: ["bach-goldberg", "bach-orchestral-suite-3"], terms: ["prelude-t", "arpeggio"]
  },
  {
    id: "bach-goldberg", composer: "bach", ko: "골드베르크 변주곡", en: "Goldberg Variations (Aria mit verschiedenen Veränderungen)",
    year: "1741 출판", key: "G major", genre: ["variations"], cat: [{ s: "bwv", t: "BWV 988" }],
    instr: "건반 (원래 2단 건반 쳄발로)",
    movements: [["Aria", "아리아"], ["Variatio 1–30", "변주 1–30 (3번째마다 카논)"], ["Aria da capo", "아리아 반복"]],
    bg: "‘클라비어 연습곡집’ 4권으로 출판된 작품입니다. 불면증에 시달리던 백작을 위해 쳄발로 연주자 골드베르크가 연주했다는 유명한 일화는 바흐 사후의 전기에 처음 등장하며, 사실 여부는 확실하지 않습니다.",
    points: ["아리아의 선율이 아니라 저음 진행(화성의 뼈대)을 바탕으로 30개의 변주가 이어집니다.", "3, 6, 9… 번째 변주는 두 성부가 같은 선율을 시차를 두고 연주하는 카논이며, 음정 간격이 1도부터 9도까지 하나씩 넓어집니다.", "마지막에 처음의 아리아가 그대로 돌아오지만, 긴 여정을 거친 뒤라 전혀 다르게 들립니다."],
    recs: [
      { p: ["gould"], label: "Columbia", year: "1955", why: "데뷔 앨범. 빠르고 명료한 터치로 이 곡을 대중적인 명곡으로 만든 전설적 녹음." },
      { p: ["gould"], label: "CBS", year: "1981", why: "같은 피아니스트의 재녹음. 훨씬 느리고 사색적이어서 1955년판과 비교하면 해석의 차이를 극명하게 들을 수 있습니다." },
      { p: ["schiff"], label: "ECM", year: "2001 (라이브)", why: "노래하는 선율과 반복구의 섬세한 장식이 돋보이는 현대 피아노 해석." },
      { p: ["pinnock"], label: "DG Archiv", year: "1980", why: "원래 악기인 쳄발로로 들어보는 정격 연주의 대표 녹음." }
    ],
    am: "Bach Goldberg Variations BWV 988 Aria", related: ["bach-wtc-1"], terms: ["canon", "variation"]
  },
  {
    id: "bach-wtc-1", composer: "bach", ko: "평균율 클라비어곡집 1권", en: "The Well-Tempered Clavier, Book I",
    year: "1722", key: "C major", keyNote: "24개 장·단조 전체 (1번이 C장조)", genre: ["fugue", "prelude"], cat: [{ s: "bwv", t: "BWV 846–869" }],
    instr: "건반 (클라비어)",
    movements: [["Prelude & Fugue No. 1 in C major", "BWV 846"], ["…", "반음씩 올라가며 장조·단조 한 쌍씩"], ["Prelude & Fugue No. 24 in B minor", "BWV 869"]],
    bg: "12개의 음 모두를 으뜸음으로 하는 24개 장·단조로 각각 전주곡과 푸가 한 쌍씩을 쓴 곡집입니다. 모든 조에서 연주할 수 있는 조율법의 가능성을 보여주며, 교육용으로도 쓰였습니다. 약 20년 뒤 2권(BWV 870–893)이 완성되었습니다.",
    points: ["1번 C장조 전주곡: 화음을 분산시킨 단순한 패턴이 끝없이 이어지는 곡. 구노가 이 위에 선율을 얹어 〈아베 마리아〉를 만들었습니다.", "각 푸가에서 첫 성부가 제시한 주제를 외운 뒤 다른 성부에서 다시 등장할 때마다 찾아보세요.", "‘평균율’은 오늘날의 12평균율과 정확히 같은 뜻은 아니며, ‘잘 조율된’ 정도로 이해하는 것이 정확합니다."],
    recs: [
      { p: ["richter"], label: "RCA / Melodiya", year: "1970–73", why: "깊고 명상적인 해석. 피아노로 연주한 평균율의 기준점 중 하나." },
      { p: ["gould"], label: "Columbia", year: "1962–65", why: "각 성부를 또렷하게 분리하는 독특하고 개성 강한 해석." },
      { p: ["schiff"], label: "ECM", year: "2011", why: "페달을 거의 쓰지 않고 성부의 노래를 투명하게 살린 연주." }
    ],
    am: "Bach Well-Tempered Clavier Prelude No. 1 C major BWV 846", related: ["bach-goldberg", "bach-toccata-fugue"], terms: ["subject", "counterpoint", "temperament"]
  },
  {
    id: "bach-brandenburg-3", composer: "bach", ko: "브란덴부르크 협주곡 3번", en: "Brandenburg Concerto No. 3",
    year: "1721 헌정", key: "G major", genre: ["concerto"], cat: [{ s: "bwv", t: "BWV 1048" }],
    instr: "바이올린 3 · 비올라 3 · 첼로 3 · 통주저음",
    movements: [["(Allegro)", "빠르게"], ["Adagio", "두 개의 화음뿐인 느린 악장"], ["Allegro", "빠르게"]],
    bg: "1721년 브란덴부르크 변경백 크리스티안 루트비히에게 헌정된 여섯 곡의 협주곡 가운데 하나입니다. 각 곡의 편성이 모두 다른데, 3번은 세 그룹의 현악기가 셋씩 짝을 이루는 독특한 구성입니다.",
    points: ["독주자와 합주의 구분 없이 아홉 개의 현악 파트가 주고받으며 대화합니다.", "2악장은 화음 두 개(프리지아 종지)만 적혀 있어, 연주자가 즉흥이나 다른 곡으로 채우는 경우가 많습니다. 녹음마다 비교해 보세요.", "3악장의 쉼 없이 질주하는 지그 리듬."],
    recs: [
      { p: ["pinnock"], label: "DG Archiv", year: "1982", why: "원전 악기 연주의 표준을 세운 녹음. 경쾌하고 투명한 울림." },
      { p: ["karlrichter"], label: "DG Archiv", year: "1967", why: "현대 악기로 연주한 웅장하고 진지한 전통적 해석." },
      { p: ["giardino"], label: "Teldec", year: "1997", why: "극단적인 템포와 강렬한 대비로 바로크의 생동감을 강조." }
    ],
    am: "Bach Brandenburg Concerto No. 3 BWV 1048 Allegro", related: ["vivaldi-spring", "bach-orchestral-suite-3"], terms: ["basso-continuo", "concerto-grosso"]
  },
  {
    id: "bach-orchestral-suite-3", composer: "bach", ko: "관현악 모음곡 3번 (G선상의 아리아)", en: "Orchestral Suite No. 3", nick: "Air on the G String",
    year: "c. 1730", key: "D major", genre: ["suite"], cat: [{ s: "bwv", t: "BWV 1068" }],
    instr: "트럼펫 3 · 팀파니 · 오보에 2 · 현악 · 통주저음",
    movements: [["Ouverture", "서곡"], ["Air", "아리아"], ["Gavotte I & II", "가보트"], ["Bourrée", "부레"], ["Gigue", "지그"]],
    bg: "라이프치히 시절 콜레기움 무지쿰(시민 음악 단체) 연주를 위해 쓰인 것으로 보입니다. 2곡 ‘아리아(Air)’는 19세기 바이올리니스트 빌헬미가 바이올린의 G현 하나로 연주할 수 있게 편곡하면서 ‘G선상의 아리아’라는 별명을 얻었습니다.",
    points: ["원곡의 ‘아리아’는 현악과 통주저음만으로 연주됩니다. 첼로·콘트라베이스가 한 걸음씩 걷듯 내려가는 저음에 귀를 기울여 보세요.", "화려한 트럼펫과 팀파니가 등장하는 서곡과 대비됩니다."],
    recs: [
      { p: ["karlrichter"], label: "DG Archiv", why: "현대 악기의 넉넉한 울림." },
      { p: ["pinnock"], label: "DG Archiv", why: "가볍고 춤추는 듯한 원전 연주." }
    ],
    am: "Bach Orchestral Suite No. 3 BWV 1068 Air", related: ["bach-brandenburg-3", "bach-cello-suite-1"], terms: ["basso-continuo"]
  },
  {
    id: "bach-toccata-fugue", composer: "bach", ko: "토카타와 푸가 D단조", en: "Toccata and Fugue in D minor",
    year: "18세기 초 (추정)", key: "D minor", genre: ["fugue"], cat: [{ s: "bwv", t: "BWV 565" }],
    instr: "오르간",
    movements: [["Toccata", "토카타"], ["Fugue", "푸가"]],
    bg: "가장 유명한 오르간 곡 가운데 하나로, 영화와 광고에서 자주 쓰여 ‘공포·장엄함’의 상징처럼 쓰입니다. 바흐의 자필 악보가 없고 양식이 독특해, 일부 학자들은 다른 작곡가의 작품이거나 원래 다른 악기를 위한 곡일 가능성을 제기합니다.",
    points: ["‘토카타’는 ‘건반을 만지다(toccare)’에서 온 말로, 즉흥적이고 화려한 기교를 보여주는 곡입니다.", "작자 논쟁은 ‘작품 정보는 검증이 필요하다’는 좋은 예입니다. 목록 번호가 있다고 해서 작자가 확정된 것은 아닙니다."],
    recs: [
      { p: ["walcha"], label: "DG Archiv", why: "바흐 오르간 음악 해석의 고전으로 꼽히는 연주자." },
      { p: ["koopman"], label: "Teldec", why: "생기 있고 장식적인 원전 연주." }
    ],
    am: "Bach Toccata and Fugue in D minor BWV 565", related: ["bach-wtc-1"], terms: ["toccata", "subject"]
  },

  /* ---------------- VIVALDI ---------------- */
  {
    id: "vivaldi-spring", composer: "vivaldi", ko: "〈사계〉 중 ‘봄’", en: "The Four Seasons — Spring (La primavera)",
    year: "1725 출판", key: "E major", genre: ["concerto", "symphonic-poem"], cat: [{ s: "op", t: "Op. 8 No. 1" }, { s: "rv", t: "RV 269" }],
    instr: "바이올린 독주 · 현악 · 통주저음",
    movements: [["Allegro", "봄이 왔다 — 새들의 노래"], ["Largo", "잠든 목동과 짖는 개"], ["Allegro (Danza pastorale)", "목가적 춤"]],
    bg: "협주곡집 〈화성과 창의의 시도(Il cimento dell'armonia e dell'inventione)〉 Op. 8의 첫 네 곡이 〈사계〉입니다. 각 곡에는 소네트(14행시)가 붙어 있고, 악보 곳곳에 시의 구절이 적혀 있어 음악이 무엇을 묘사하는지 알 수 있습니다.",
    points: ["1악장: 독주 바이올린과 오케스트라 바이올린들이 새소리를 흉내 내는 트릴과 반복음을 찾아보세요.", "2악장: 비올라가 계속 반복하는 두 음은 소네트에 적힌 ‘짖는 개’입니다.", "합주가 반복하는 후렴(리토르넬로)과 독주 부분이 번갈아 나오는 협주곡 구조를 듣기에 가장 좋은 곡입니다."],
    recs: [
      { p: ["imusici"], label: "Philips", year: "1959", why: "펠릭스 아요의 독주. 이 곡을 전 세계적으로 유명하게 만든 고전적 녹음." },
      { p: ["giardino"], label: "Teldec", year: "1993", why: "거칠고 극적인 대비로 ‘사계’의 묘사성을 생생하게 살린 원전 연주. 이전 해석과 비교하면 충격적일 만큼 다릅니다." },
      { p: ["biondi"], label: "Opus 111", year: "1991", why: "이탈리아 원전 연주 붐을 이끈 자유롭고 즉흥적인 해석." },
      { p: ["mutter", "karajan"], label: "EMI", year: "1984", why: "빈 필하모닉과의 녹음. 현대 악기의 화려하고 낭만적인 울림." }
    ],
    am: "Vivaldi Four Seasons Spring RV 269 Allegro", related: ["vivaldi-summer", "vivaldi-winter", "bach-brandenburg-3"], terms: ["ritornello", "basso-continuo"]
  },
  {
    id: "vivaldi-summer", composer: "vivaldi", ko: "〈사계〉 중 ‘여름’", en: "The Four Seasons — Summer (L'estate)",
    year: "1725 출판", key: "G minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 8 No. 2" }, { s: "rv", t: "RV 315" }],
    instr: "바이올린 독주 · 현악 · 통주저음",
    movements: [["Allegro non molto – Allegro", "무더위, 뻐꾸기, 다가오는 폭풍"], ["Adagio – Presto", "천둥과 파리 떼"], ["Presto", "여름 폭풍"]],
    bg: "‘여름’은 나른한 더위에서 시작해 폭풍으로 끝납니다. 단조로 쓰인 이 곡은 〈사계〉 중 가장 극적인 곡으로 꼽힙니다.",
    points: ["3악장의 폭풍: 빠르게 반복되는 음과 아래로 쏟아지는 음계가 우박과 번개를 그립니다.", "2악장에서 느린 독주 사이에 갑자기 끼어드는 오케스트라의 ‘천둥’."],
    recs: [
      { p: ["giardino"], label: "Teldec", year: "1993", why: "폭풍 장면의 격렬함이 특히 돋보이는 연주." },
      { p: ["imusici"], label: "Philips", year: "1959", why: "균형 잡힌 고전적 해석." }
    ],
    am: "Vivaldi Four Seasons Summer RV 315 Presto", related: ["vivaldi-spring", "vivaldi-winter"], terms: ["ritornello"]
  },
  {
    id: "vivaldi-winter", composer: "vivaldi", ko: "〈사계〉 중 ‘겨울’", en: "The Four Seasons — Winter (L'inverno)",
    year: "1725 출판", key: "F minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 8 No. 4" }, { s: "rv", t: "RV 297" }],
    instr: "바이올린 독주 · 현악 · 통주저음",
    movements: [["Allegro non molto", "얼어붙은 추위, 이 부딪히는 소리"], ["Largo", "난롯가의 평온, 밖에는 비"], ["Allegro", "얼음 위를 걷다 미끄러짐"]],
    bg: "추위에 떨며 발을 구르는 장면부터 난롯가의 휴식, 빙판길까지 겨울의 장면을 그립니다.",
    points: ["1악장 시작: 현악기들이 쌓아 올리는 불협화음과 떨리는 반복음이 추위를 표현합니다.", "2악장: 독주 바이올린의 따뜻한 선율 아래 현악기의 피치카토(현을 뜯기)가 창밖의 빗방울을 그립니다."],
    recs: [
      { p: ["biondi"], label: "Opus 111", year: "1991", why: "날카롭고 생생한 묘사." },
      { p: ["mutter", "karajan"], label: "EMI", year: "1984", why: "2악장의 서정성이 특히 아름다운 낭만적 해석." }
    ],
    am: "Vivaldi Four Seasons Winter RV 297 Largo", related: ["vivaldi-spring", "vivaldi-summer"], terms: ["pizzicato"]
  },
  {
    id: "vivaldi-gloria", composer: "vivaldi", ko: "글로리아", en: "Gloria",
    year: "c. 1715", key: "D major", genre: ["requiem"], cat: [{ s: "rv", t: "RV 589" }],
    instr: "독창 · 합창 · 오케스트라",
    movements: [["Gloria in excelsis Deo", "하늘 높은 곳에는 하느님께 영광"], ["Et in terra pax", "땅에서는 평화"], ["…", "모두 12곡"], ["Cum Sancto Spiritu", "성령과 함께 — 이중 푸가"]],
    bg: "미사 통상문 가운데 ‘대영광송(글로리아)’ 부분을 12곡으로 나누어 작곡한 곡입니다. 피에타 기관의 여성 음악가들을 위해 쓰였을 것으로 추정됩니다. 20세기 중반에야 다시 연주되기 시작해 지금은 비발디의 가장 사랑받는 성악곡이 되었습니다.",
    points: ["첫 곡의 옥타브로 도약하는 밝은 리듬과 트럼펫의 광채.", "느리고 어두운 2곡 ‘Et in terra pax’와의 대비."],
    recs: [],
    am: "Vivaldi Gloria RV 589", related: ["mozart-requiem"], terms: []
  },

  /* ---------------- MOZART ---------------- */
  {
    id: "mozart-symphony-40", composer: "mozart", ko: "교향곡 40번", en: "Symphony No. 40",
    year: "1788", key: "G minor", genre: ["symphony"], cat: [{ s: "k", t: "K. 550" }],
    instr: "플루트 · 오보에 2 · 클라리넷 2(개정판) · 바순 2 · 호른 2 · 현악",
    movements: [["Molto allegro", "매우 빠르게"], ["Andante", "걷는 빠르기로"], ["Menuetto: Allegretto – Trio", "미뉴에트"], ["Finale: Allegro assai", "매우 빠르게"]],
    bg: "1788년 여름, 약 6주 사이에 완성된 마지막 세 교향곡(39·40·41번) 가운데 하나입니다. 모차르트의 교향곡 41곡 중 단조는 25번과 이 40번 두 곡뿐입니다. 트럼펫과 팀파니 없이 쓰였습니다.",
    points: ["1악장은 서주 없이 비올라의 반주 위에서 바이올린이 ‘한숨 쉬는 듯한’ 주제를 곧바로 시작합니다.", "단조이지만 슬픔보다는 긴박함·불안에 가깝게 들립니다. [[th:major-minor|장조와 단조]]의 정서가 하나로 정해지지 않는다는 좋은 예입니다.", "4악장 발전부에서 조성이 극도로 불안정해지는 대목은 당시로서 매우 대담했습니다."],
    recs: [
      { p: ["bohm"], label: "DG", why: "베를린 필과의 전집 녹음. 품격 있고 안정된 고전적 해석." },
      { p: ["gardiner"], label: "Philips", why: "잉글리시 바로크 솔로이스츠의 원전 악기 연주. 빠르고 날렵한 긴장감." },
      { p: ["walter"], label: "Columbia / Sony", why: "따뜻하고 노래하는 낭만적 해석의 대표." }
    ],
    am: "Mozart Symphony No. 40 in G minor K. 550 Molto allegro", related: ["mozart-pc21", "beethoven-symphony-5"], terms: ["sonata-form", "minuet"]
  },
  {
    id: "mozart-pc21", composer: "mozart", ko: "피아노 협주곡 21번", en: "Piano Concerto No. 21",
    year: "1785", key: "C major", genre: ["concerto"], cat: [{ s: "k", t: "K. 467" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Allegro maestoso", "당당하게 빠르게"], ["Andante", "걷는 빠르기로"], ["Allegro vivace assai", "매우 빠르고 생기 있게"]],
    bg: "빈에서 자신의 예약 연주회를 위해 작곡하고 직접 독주한 협주곡입니다. 2악장은 1967년 스웨덴 영화 〈엘비라 마디간〉에 쓰이면서 ‘엘비라 마디간’이라는 별명으로도 불리지만, 이는 모차르트와 무관한 이름입니다.",
    points: ["2악장: 약음기를 낀 현악기의 셋잇단음표 반주 위로 피아노가 길게 노래합니다.", "1악장에서 행진곡풍 리듬의 오케스트라 도입과 피아노 등장의 대비.", "카덴차는 모차르트의 것이 남아 있지 않아 연주자마다 다른 카덴차를 씁니다."],
    recs: [
      { p: ["anda"], label: "DG", why: "피아노와 지휘를 함께 맡은 녹음. 2악장이 영화에 쓰인 바로 그 연주로 알려져 있습니다." },
      { p: ["perahia"], label: "CBS / Sony", why: "잉글리시 체임버 오케스트라와 직접 지휘하며 연주한 전집. 섬세하고 맑은 터치." },
      { p: ["uchida"], label: "Philips", why: "제프리 테이트 지휘, 잉글리시 체임버 오케스트라. 음 하나하나의 무게를 고른 우아한 해석." }
    ],
    am: "Mozart Piano Concerto No. 21 K. 467 Andante", related: ["mozart-symphony-40", "chopin-pc1"], terms: ["cadenza", "tutti"]
  },
  {
    id: "mozart-k331", composer: "mozart", ko: "피아노 소나타 11번 (터키 행진곡)", en: "Piano Sonata No. 11", nick: "Alla Turca",
    year: "c. 1783", key: "A major", genre: ["sonata", "variations"], cat: [{ s: "k", t: "K. 331 (300i)" }],
    instr: "피아노 독주",
    movements: [["Andante grazioso", "주제와 6개의 변주"], ["Menuetto", "미뉴에트"], ["Alla turca: Allegretto", "터키풍으로"]],
    bg: "3악장이 ‘터키 행진곡’으로 너무 유명해 소나타 전체가 그 이름으로 불리곤 합니다. 당시 빈에서는 오스만 제국 군악대(예니체리)의 소리를 흉내 낸 ‘터키풍’ 음악이 유행했습니다. 첫 악장이 소나타 형식이 아닌 변주곡이라는 점이 특이합니다.",
    points: ["1악장: 짧은 주제가 6번 모습을 바꿉니다. 변주 형식을 처음 듣기에 이상적입니다.", "3악장: 왼손의 ‘쿵짝’ 반주가 군악대의 큰북과 심벌즈를 흉내 냅니다.", "K. 331 (300i): 쾨헬 목록 개정판에서 매겨진 번호가 괄호로 함께 표기됩니다."],
    recs: [
      { p: ["uchida"], label: "Philips", why: "모차르트 소나타 전집의 대표적 녹음. 투명하고 우아한 해석." },
      { p: ["pires"], label: "DG", why: "자연스럽고 따뜻한 노래." }
    ],
    am: "Mozart Piano Sonata No. 11 K. 331 Alla Turca", related: ["beethoven-pathetique"], terms: ["variation", "minuet"]
  },
  {
    id: "mozart-eine-kleine", composer: "mozart", ko: "아이네 클라이네 나흐트무지크", en: "Eine kleine Nachtmusik (Serenade No. 13)",
    year: "1787", key: "G major", genre: ["chamber", "string-quartet"], cat: [{ s: "k", t: "K. 525" }],
    instr: "현악 합주 (또는 현악 4중주 + 더블베이스)",
    movements: [["Allegro", "빠르게"], ["Romanze: Andante", "로망스"], ["Menuetto: Allegretto", "미뉴에트"], ["Rondo: Allegro", "론도"]],
    bg: "‘작은 밤의 음악’이라는 뜻으로, 저녁 모임에서 연주되던 가벼운 기악곡 장르인 세레나데입니다. 모차르트는 자신의 작품 목록에 원래 5악장이라고 적었지만 미뉴에트 하나가 사라져 오늘날 4악장으로 연주됩니다. 작곡 동기는 알려져 있지 않으며, 모차르트 사후에 출판되었습니다.",
    points: ["1악장 첫머리의 ‘솔-레-솔-레-솔레솔시레’ — 으뜸화음을 위로 펼친 [[t:arpeggio|분산화음]] 주제.", "4악장 [[t:rondo|론도]]: 같은 주제(A)가 여러 번 돌아오는 구조를 따라가 보세요."],
    recs: [
      { p: ["karajan"], label: "DG", why: "베를린 필의 풍성하고 매끄러운 현악 사운드." },
      { p: ["marriner"], label: "Philips / Argo", why: "아카데미 오브 세인트 마틴 인 더 필즈. 날렵하고 생기 있는 실내 관현악 규모의 연주." },
      { p: ["walter"], label: "Columbia / Sony", why: "여유롭고 따뜻한 노래." }
    ],
    am: "Mozart Eine kleine Nachtmusik K. 525 Allegro", related: ["mozart-symphony-40"], terms: ["rondo", "minuet", "arpeggio"]
  },
  {
    id: "mozart-requiem", composer: "mozart", ko: "레퀴엠", en: "Requiem",
    year: "1791 (미완성)", key: "D minor", genre: ["requiem", "oratorio"], cat: [{ s: "k", t: "K. 626" }],
    instr: "독창 4 · 합창 · 오케스트라",
    movements: [["Introitus: Requiem aeternam", "입당송"], ["Kyrie", "자비송 — 이중 푸가"], ["Sequentia: Dies irae … Lacrimosa", "부속가 — 진노의 날 … 눈물의 날"], ["Offertorium", "봉헌송"], ["Sanctus · Benedictus · Agnus Dei", "쉬스마이어 작곡"], ["Communio: Lux aeterna", "영성체송"]],
    bg: "익명의 의뢰인(나중에 발제크 백작으로 밝혀짐)의 주문을 받아 작곡하던 중 모차르트가 세상을 떠났습니다. 아내 콘스탄체의 요청으로 제자 쥐스마이어가 완성한 판본이 가장 널리 연주되며, 이후 다른 학자들의 완성판도 여럿 있습니다. 영화 〈아마데우스〉의 극적 이야기는 상당 부분 허구입니다.",
    points: ["‘Lacrimosa’는 모차르트가 8마디까지 쓰고 멈춘 곳으로 알려져 있습니다.", "‘Dies irae’의 격렬한 합창과 ‘Tuba mirum’에서 트롬본 독주의 대비.", "완성 판본(쥐스마이어, 바이어, 레빈 등)에 따라 다른 부분이 있어 녹음 비교가 흥미롭습니다."],
    recs: [
      { p: ["bohm"], label: "DG", year: "1971", why: "빈 필과의 녹음. 느리고 장엄한 전통적 해석." },
      { p: ["gardiner"], label: "Philips", year: "1986", why: "몬테베르디 합창단과 원전 악기. 투명하고 극적인 긴장감." },
      { p: ["karajan"], label: "DG", why: "베를린 필의 풍부한 음향." }
    ],
    am: "Mozart Requiem K. 626 Lacrimosa", related: ["vivaldi-gloria", "mozart-magic-flute"], terms: ["subject"]
  },
  {
    id: "mozart-magic-flute", composer: "mozart", ko: "오페라 〈마술피리〉", en: "Die Zauberflöte",
    year: "1791", key: "Eb major", keyNote: "서곡 기준", genre: ["opera"], cat: [{ s: "k", t: "K. 620" }],
    instr: "독창 · 합창 · 오케스트라 (2막 징슈필)",
    movements: [["Ouvertüre", "서곡"], ["Der Vogelfänger bin ich ja", "파파게노의 아리아"], ["Dies Bildnis ist bezaubernd schön", "타미노의 아리아"], ["Der Hölle Rache", "밤의 여왕의 아리아"]],
    bg: "흥행사이자 배우 쉬카네더의 대본으로, 빈 교외의 대중 극장에서 초연된 독일어 오페라입니다. 노래 사이에 대사가 들어가는 ‘징슈필’ 형식으로, 동화 같은 줄거리 속에 계몽주의와 프리메이슨의 상징이 담겨 있습니다. 모차르트가 세상을 떠나기 약 두 달 전에 초연되었습니다.",
    points: ["밤의 여왕 아리아 ‘지옥의 복수가 내 마음에 끓어오르고’: 높은 F음(F6)까지 올라가는 콜로라투라 소프라노의 기교.", "파파게노와 파파게나의 ‘파-파-파’ 이중창의 유머.", "서곡을 시작하는 세 번의 화음 — 숫자 3은 작품 전체의 상징입니다."],
    recs: [
      { p: ["bohm"], label: "DG", year: "1964", why: "베를린 필, 프리츠 분더리히(타미노), 피셔디스카우(파파게노) 등 황금 캐스팅." },
      { p: ["klemperer"], label: "EMI", year: "1964", why: "대사를 생략한 녹음. 장중하고 깊이 있는 해석." }
    ],
    am: "Mozart Die Zauberflöte K. 620 Der Hölle Rache", related: ["mozart-requiem"], terms: ["aria", "coloratura"]
  },

  /* ---------------- BEETHOVEN ---------------- */
  {
    id: "beethoven-symphony-5", composer: "beethoven", ko: "교향곡 5번", en: "Symphony No. 5",
    year: "1804–1808", key: "C minor", genre: ["symphony"], cat: [{ s: "op", t: "Op. 67" }],
    instr: "2관 편성 오케스트라 (4악장에 피콜로·콘트라바순·트롬본 추가)",
    movements: [["Allegro con brio", "생기 있게 빠르게"], ["Andante con moto", "움직임 있게"], ["Scherzo: Allegro", "스케르초"], ["Allegro", "빠르게 — 3악장에서 쉼 없이 이어짐"]],
    bg: "1808년 12월 22일 빈 안 데어 빈 극장에서 교향곡 6번 〈전원〉 등과 함께 4시간이 넘는 연주회에서 초연되었습니다. ‘운명’이라는 별명은 비서 쉰들러가 전한 ‘운명은 이렇게 문을 두드린다’는 일화에서 왔는데, 이 일화의 신빙성은 낮게 평가되며 독일어권에서는 이 별명을 잘 쓰지 않습니다.",
    points: ["‘짧-짧-짧-길게’ 네 음 [[t:motif|동기]]가 1악장 전체를, 나아가 교향곡 전체를 꿰뚫습니다.", "C단조의 투쟁에서 4악장 C장조의 승리로 — ‘어둠에서 빛으로’의 서사.", "3악장에서 4악장으로 끊김 없이 넘어가는 순간의 긴장과 폭발.", "4악장에 트롬본·피콜로·콘트라바순이 더해져 소리가 확 넓어집니다. 교향곡에 트롬본을 쓴 초기의 유명한 예입니다."],
    recs: [
      { p: ["ckleiber"], label: "DG", year: "1975 발매", why: "빈 필과의 녹음. 강렬한 추진력과 긴장감으로 이 곡의 대표 음반으로 꾸준히 꼽힙니다." },
      { p: ["karajan"], label: "DG", year: "1962", why: "베를린 필과의 첫 스테레오 전집 중. 완벽하게 다듬어진 웅장함." },
      { p: ["furtwangler"], label: "여러 레이블", year: "1943 (라이브)", why: "전쟁 중 베를린에서의 실황. 음질의 한계에도 역사적·해석적 무게로 자주 거론됩니다." }
    ],
    am: "Beethoven Symphony No. 5 Op. 67 Allegro con brio", related: ["beethoven-symphony-9", "mozart-symphony-40"], terms: ["motif", "sonata-form", "scherzo-t"]
  },
  {
    id: "beethoven-symphony-9", composer: "beethoven", ko: "교향곡 9번 〈합창〉", en: "Symphony No. 9", nick: "Choral",
    year: "1822–1824", key: "D minor", genre: ["symphony"], cat: [{ s: "op", t: "Op. 125" }],
    instr: "대편성 오케스트라 · 독창 4 · 합창",
    movements: [["Allegro ma non troppo, un poco maestoso", "빠르게, 지나치지 않게"], ["Molto vivace", "스케르초"], ["Adagio molto e cantabile", "매우 느리고 노래하듯"], ["Presto – Allegro assai", "환희의 송가"]],
    bg: "1824년 5월 7일 빈 케른트너토어 극장에서 초연되었습니다. 이미 청력을 거의 잃은 베토벤이 무대에 함께 섰고, 연주가 끝난 뒤 관객의 환호를 듣지 못해 독창자가 그를 돌려세워 박수를 보게 했다는 일화가 전해집니다. 4악장에 실러의 시 〈환희에 부쳐〉를 넣어, 교향곡에 성악을 도입한 획기적인 작품이 되었습니다.",
    points: ["4악장 시작부에서 첼로·베이스가 앞선 세 악장의 주제를 하나씩 ‘거절’하고 환희의 주제를 찾아냅니다.", "환희의 주제는 처음엔 저음 현악기로 조용히, 점점 악기가 더해지며 커집니다.", "‘환희의 송가’ 선율은 오늘날 유럽연합의 상징가로 쓰입니다."],
    recs: [
      { p: ["furtwangler"], label: "EMI", year: "1951 (바이로이트 라이브)", why: "바이로이트 축제 재개 기념 연주. 역사상 가장 유명한 9번 녹음 중 하나." },
      { p: ["karajan"], label: "DG", year: "1962", why: "베를린 필의 매끄럽고 힘 있는 스튜디오 녹음." },
      { p: ["bernstein"], label: "DG", year: "1989 (라이브)", why: "베를린 장벽 붕괴 직후의 연주. ‘환희(Freude)’를 ‘자유(Freiheit)’로 바꿔 불렀습니다." }
    ],
    am: "Beethoven Symphony No. 9 Op. 125 Ode to Joy", related: ["beethoven-symphony-5"], terms: ["scherzo-t"]
  },
  {
    id: "beethoven-moonlight", composer: "beethoven", ko: "피아노 소나타 14번 〈월광〉", en: "Piano Sonata No. 14 'Sonata quasi una fantasia'", nick: "Moonlight",
    year: "1801", key: "C# minor", genre: ["sonata"], cat: [{ s: "op", t: "Op. 27 No. 2" }],
    instr: "피아노 독주",
    movements: [["Adagio sostenuto", "느리게, 음을 충분히 끌며"], ["Allegretto", "조금 빠르게"], ["Presto agitato", "매우 빠르고 격하게"]],
    bg: "베토벤이 붙인 제목은 ‘환상곡풍의 소나타(Sonata quasi una fantasia)’입니다. ‘월광’이라는 별명은 베토벤 사후 시인 렐슈타프가 1악장을 루체른 호수의 달빛에 비유한 데서 퍼졌습니다. 제자였던 줄리에타 귀차르디 백작 영애에게 헌정되었습니다.",
    points: ["느린 악장으로 시작하는 파격 — 고전적 소나타는 보통 빠른 악장으로 시작합니다.", "1악장: 셋잇단음표의 끝없는 흐름 위에 떠오르는 선율. 베토벤은 처음부터 끝까지 댐퍼 페달을 떼지 말라고 지시했습니다.", "무게중심이 마지막 3악장의 폭풍 같은 [[t:sonata-form|소나타 형식]]에 있습니다."],
    recs: [
      { p: ["kempff"], label: "DG", why: "시적이고 담백한 해석. 베토벤 소나타 해석의 고전." },
      { p: ["gilels"], label: "DG", why: "단단한 구조감과 깊은 음색." },
      { p: ["barenboim"], label: "EMI / DG", why: "여러 차례 전집을 녹음한 연주자의 극적인 해석." }
    ],
    am: "Beethoven Piano Sonata No. 14 Moonlight Op. 27 No. 2 Adagio sostenuto", related: ["beethoven-pathetique", "beethoven-fur-elise"], terms: ["sonata-form", "adagio"]
  },
  {
    id: "beethoven-pathetique", composer: "beethoven", ko: "피아노 소나타 8번 〈비창〉", en: "Piano Sonata No. 8 'Grande sonate pathétique'", nick: "Pathétique",
    year: "1798", key: "C minor", genre: ["sonata"], cat: [{ s: "op", t: "Op. 13" }],
    instr: "피아노 독주",
    movements: [["Grave – Allegro di molto e con brio", "장중하게 – 매우 빠르고 생기 있게"], ["Adagio cantabile", "느리게 노래하듯"], ["Rondo: Allegro", "론도"]],
    bg: "〈월광〉과 달리 ‘비창(Pathétique)’은 출판 당시부터 붙은 제목으로, 베토벤이 동의한 것으로 여겨집니다. 20대 후반의 베토벤이 피아니스트로서 이름을 떨치던 시기의 작품입니다. 차이콥스키의 교향곡 6번 〈비창〉과는 다른 곡입니다.",
    points: ["무거운 [[t:grave|Grave]] 서주의 화음과, 이어지는 빠른 주부의 대비.", "2악장의 따뜻한 선율은 수많은 편곡으로 사랑받아 왔습니다."],
    recs: [
      { p: ["kempff"], label: "DG", why: "자연스럽게 노래하는 2악장." },
      { p: ["gilels"], label: "DG", why: "장중하고 힘 있는 1악장." }
    ],
    am: "Beethoven Piano Sonata No. 8 Pathetique Op. 13 Adagio cantabile", related: ["beethoven-moonlight", "tchaikovsky-symphony-6"], terms: ["grave", "rondo"]
  },
  {
    id: "beethoven-fur-elise", composer: "beethoven", ko: "엘리제를 위하여", en: "Für Elise (Bagatelle No. 25)",
    year: "1810", key: "A minor", genre: [], cat: [{ s: "woo", t: "WoO 59" }],
    instr: "피아노 독주",
    movements: [["Poco moto", "조금 움직임 있게 — A-B-A-C-A 론도"]],
    bg: "베토벤 생전에는 출판되지 않았고, 1867년 음악학자 루트비히 놀이 발견해 출판했습니다. 그가 본 자필 악보는 지금 전해지지 않습니다. ‘엘리제’가 누구인지는 지금도 분명하지 않으며, 테레제 말파티라는 여성의 이름을 잘못 읽은 것이라는 설이 유명합니다.",
    points: ["Op. 번호가 없어 WoO(작품번호 없는 작품)로 분류됩니다. [[cat:woo|WoO 표기 설명 보기]]", "‘미-레#-미-레#-미’로 시작하는 주제(A)가 서로 다른 성격의 B·C 사이로 돌아오는 [[t:rondo|론도]] 형식."],
    recs: [],
    am: "Beethoven Für Elise WoO 59", related: ["beethoven-moonlight"], terms: ["bagatelle", "rondo"]
  },
  {
    id: "beethoven-violin-concerto", composer: "beethoven", ko: "바이올린 협주곡", en: "Violin Concerto",
    year: "1806", key: "D major", genre: ["concerto"], cat: [{ s: "op", t: "Op. 61" }],
    instr: "바이올린 독주 · 오케스트라",
    movements: [["Allegro ma non troppo", "빠르게, 지나치지 않게"], ["Larghetto", "조금 느리게"], ["Rondo: Allegro", "론도"]],
    bg: "베토벤이 남긴 유일한 바이올린 협주곡입니다. 초연 당시엔 큰 성공을 거두지 못했지만, 1844년 12세의 요제프 요아힘이 멘델스존의 지휘로 연주하면서 바이올린 협주곡의 최고봉으로 자리 잡았습니다.",
    points: ["곡의 시작: 팀파니가 혼자 두드리는 다섯 번의 박이 곡 전체의 리듬 동기가 됩니다.", "베토벤은 카덴차를 남기지 않아 크라이슬러, 요아힘 등 여러 사람의 카덴차가 쓰입니다."],
    recs: [
      { p: ["heifetz"], label: "RCA", year: "1955", why: "샤를 뮌슈 지휘 보스턴 심포니. 빠르고 완벽하게 정제된 연주." },
      { p: ["oistrakh"], label: "EMI", year: "1958", why: "앙드레 클뤼탕스 지휘. 따뜻하고 넉넉한 음색." },
      { p: ["mutter", "karajan"], label: "DG", year: "1979", why: "베를린 필. 10대 시절 뮈터의 젊은 패기." }
    ],
    am: "Beethoven Violin Concerto Op. 61 Allegro ma non troppo", related: ["tchaikovsky-violin-concerto"], terms: ["cadenza"]
  },

  /* ---------------- SCHUBERT ---------------- */
  {
    id: "schubert-impromptus-d899", composer: "schubert", ko: "즉흥곡집", en: "4 Impromptus",
    year: "1827", key: "C minor", keyNote: "1번 C단조 · 2번 E♭장조 · 3번 G♭장조 · 4번 A♭장조", genre: ["impromptu"], cat: [{ s: "d", t: "D. 899" }, { s: "op", t: "Op. 90" }],
    instr: "피아노 독주",
    movements: [["No. 1 in C minor: Allegro molto moderato", "다단조"], ["No. 2 in E-flat major: Allegro", "내림마장조"], ["No. 3 in G-flat major: Andante", "내림사장조"], ["No. 4 in A-flat major: Allegretto", "내림가장조"]],
    bg: "슈베르트가 세상을 떠나기 1년 전에 쓴 네 곡의 피아노 소품집입니다. 생전에는 1·2번만 출판되었고 3·4번은 사후에 나왔습니다. D. 번호(도이치 목록)와 Op. 번호(출판 번호)가 함께 붙는 대표적인 예입니다.",
    points: ["3번: 하프 같은 반주 위로 끝없이 이어지는 노래 — ‘가사 없는 가곡’.", "2번: 셋잇단음표가 물 흐르듯 빠르게 흐르다 거친 중간부로 바뀝니다.", "[[cat:d|D. 899 / Op. 90]] 두 번호 체계의 차이를 읽어 보세요."],
    recs: [
      { p: ["zimerman"], label: "DG", year: "1990", why: "정교한 음색 조절과 깊은 서정성으로 높이 평가받는 녹음." },
      { p: ["uchida"], label: "Philips", why: "섬세하고 내밀한 해석." },
      { p: ["brendel"], label: "Philips", why: "슈베르트 피아노 음악 해석의 권위자." }
    ],
    am: "Schubert Impromptu D. 899 No. 3 G-flat major", related: ["schubert-d960", "chopin-nocturne-op9-2"], terms: []
  },
  {
    id: "schubert-d960", composer: "schubert", ko: "피아노 소나타 21번", en: "Piano Sonata No. 21",
    year: "1828", key: "Bb major", genre: ["sonata"], cat: [{ s: "d", t: "D. 960" }],
    instr: "피아노 독주",
    movements: [["Molto moderato", "아주 보통 빠르기로"], ["Andante sostenuto", "느리게, 음을 끌며"], ["Scherzo: Allegro vivace con delicatezza", "섬세하게"], ["Allegro ma non troppo", "빠르게, 지나치지 않게"]],
    bg: "세상을 떠나기 약 두 달 전인 1828년 9월에 완성한 마지막 세 소나타(D. 958–960) 중 마지막 곡입니다. 1악장만 해도 20분 안팎이 걸리며, 슈베르트 소나타가 재평가된 20세기 이후 피아노 문헌의 최고봉 중 하나로 꼽힙니다.",
    points: ["1악장 첫 주제 뒤에 멀리서 울리는 낮은 트릴 — 불안한 그림자처럼 곡 전체에 드리워집니다.", "1악장 제시부 반복을 할지 말지는 연주자마다 다른 선택입니다. 음반의 1악장 길이를 비교해 보세요."],
    recs: [
      { p: ["richter"], label: "여러 레이블", year: "1972", why: "극도로 느린 1악장 템포로 유명한, 명상적이고 거대한 해석." },
      { p: ["curzon"], label: "Decca", why: "절제되고 고귀한 서정." },
      { p: ["uchida"], label: "Philips", why: "투명한 음색과 세밀한 셈여림." }
    ],
    am: "Schubert Piano Sonata D. 960 Molto moderato", related: ["schubert-impromptus-d899", "beethoven-moonlight"], terms: ["trill", "exposition"]
  },
  {
    id: "schubert-winterreise", composer: "schubert", ko: "겨울 나그네", en: "Winterreise",
    year: "1827", key: "D minor", keyNote: "1곡 ‘밤 인사’ 기준", genre: ["lied"], cat: [{ s: "d", t: "D. 911" }, { s: "op", t: "Op. 89" }],
    instr: "성악(주로 남성 독창) · 피아노",
    movements: [["1. Gute Nacht", "밤 인사"], ["5. Der Lindenbaum", "보리수"], ["…", "모두 24곡"], ["24. Der Leiermann", "거리의 악사"]],
    bg: "시인 빌헬름 뮐러의 연작시에 곡을 붙인 24곡의 연가곡입니다. 사랑에 실패한 젊은이가 겨울 길을 떠돌며 겪는 고독을 그립니다. 슈베르트는 친구들에게 이 곡을 처음 들려주었을 때 그 어두움에 친구들이 당황했다고 전해집니다.",
    points: ["5곡 ‘보리수’는 독일 민요처럼 불릴 만큼 유명합니다. 장조와 단조가 엇갈리는 부분에 주목하세요.", "마지막 곡 ‘거리의 악사’: 같은 음형만 반복하는 피아노가 텅 빈 겨울 풍경과 체념을 그립니다.", "가사 번역과 함께 24곡을 처음부터 끝까지 듣는 것을 권합니다(약 70~80분)."],
    recs: [
      { p: ["fischer-dieskau"], label: "EMI / DG", year: "여러 차례 녹음", why: "평생 여러 피아니스트와 녹음한 리트 해석의 기준점. 제럴드 무어와의 녹음이 특히 유명합니다." },
      { p: ["hotter"], label: "EMI", year: "1954", why: "베이스바리톤의 어둡고 깊은 음색으로 노년의 방랑자처럼 그려낸 해석." },
      { p: ["bostridge"], label: "EMI", year: "2004", why: "레이프 오베 안스네스의 피아노. 극적이고 섬세한 현대적 해석." }
    ],
    am: "Schubert Winterreise D. 911 Der Lindenbaum", related: ["schubert-erlkonig"], terms: ["song-cycle"]
  },
  {
    id: "schubert-erlkonig", composer: "schubert", ko: "마왕", en: "Erlkönig",
    year: "1815", key: "G minor", genre: ["lied"], cat: [{ s: "d", t: "D. 328" }, { s: "op", t: "Op. 1" }],
    instr: "성악 · 피아노",
    movements: [["Schnell", "빠르게 — 통작 가곡"]],
    bg: "괴테의 시에 18세의 슈베르트가 곡을 붙였습니다. 병든 아이를 안고 밤길을 말로 달리는 아버지, 아이를 유혹하는 마왕의 이야기입니다. 1821년 그의 첫 출판 작품(Op. 1)이 되었습니다.",
    points: ["한 명의 가수가 화자·아버지·아들·마왕 네 역할을 음역과 음색으로 구별해 노래합니다.", "아들의 외침은 점점 높아지고 불협화음이 날카로워집니다.", "피아노 오른손이 처음부터 끝까지 쉬지 않고 두드리는 옥타브 셋잇단음표 — 질주하는 말발굽입니다."],
    recs: [
      { p: ["fischer-dieskau"], label: "DG / EMI", why: "네 인물의 성격을 극적으로 구분한 고전적 해석." }
    ],
    am: "Schubert Erlkönig D. 328", related: ["schubert-winterreise"], terms: ["through-composed"]
  },
  {
    id: "schubert-unfinished", composer: "schubert", ko: "교향곡 8번 〈미완성〉", en: "Symphony No. 8 'Unfinished'", nick: "Unfinished",
    year: "1822", key: "B minor", genre: ["symphony"], cat: [{ s: "d", t: "D. 759" }],
    instr: "오케스트라",
    movements: [["Allegro moderato", "보통 빠르게"], ["Andante con moto", "움직임 있게"]],
    bg: "두 악장만 완성되고 3악장은 스케치와 일부 피아노 악보만 남아 있습니다. 왜 완성하지 않았는지는 지금도 수수께끼입니다. 악보는 친구 휘텐브레너가 오랫동안 보관하다가 슈베르트 사후 40여 년 뒤인 1865년에야 초연되었습니다. 번호 체계에 따라 ‘7번’으로 표기되기도 합니다.",
    points: ["1악장: 첼로·베이스의 어두운 서주 뒤, 첼로가 부르는 따뜻한 두 번째 주제는 슈베르트 선율의 정수입니다.", "두 악장만으로도 완결된 느낌을 주어 ‘미완성’이 오히려 작품의 일부처럼 받아들여집니다."],
    recs: [
      { p: ["ckleiber"], label: "DG", year: "1978", why: "빈 필과의 녹음. 긴장감 넘치는 극적인 해석." },
      { p: ["walter"], label: "Columbia / Sony", why: "따뜻하고 노래하는 전통적 해석." }
    ],
    am: "Schubert Symphony No. 8 Unfinished D. 759 Allegro moderato", related: ["beethoven-symphony-5"], terms: []
  },
  {
    id: "schubert-trout", composer: "schubert", ko: "피아노 5중주 〈송어〉", en: "Piano Quintet 'Trout' (Forellenquintett)", nick: "Trout",
    year: "1819", key: "A major", genre: ["chamber", "variations"], cat: [{ s: "d", t: "D. 667" }, { s: "op", t: "Op. posth. 114" }],
    instr: "피아노 · 바이올린 · 비올라 · 첼로 · 더블베이스",
    movements: [["Allegro vivace", "생기 있게"], ["Andante", "걷는 빠르기로"], ["Scherzo: Presto", "스케르초"], ["Andantino – Allegretto", "가곡 〈송어〉 주제와 변주"], ["Allegro giusto", "적당히 빠르게"]],
    bg: "여름 여행 중 만난 음악 애호가의 의뢰로 쓰였습니다. 4악장에서 자신의 가곡 〈송어〉(D. 550)의 선율을 주제로 변주를 펼쳐 ‘송어’라는 이름이 붙었습니다. 사후 1829년 출판되었습니다.",
    points: ["일반적인 피아노 5중주(피아노 + 현악 4중주)와 달리 제2바이올린 대신 더블베이스를 넣은 특이한 편성.", "4악장: 가곡의 주제가 악기를 바꿔 가며 변주됩니다. 마지막 변주에서 원래 가곡의 피아노 반주가 등장합니다.", "보통 4악장인 실내악과 달리 5악장으로 되어 있습니다."],
    recs: [
      { p: ["curzon"], label: "Decca", year: "1957", why: "빈 8중주단 단원들과의 녹음. 빈 특유의 여유와 우아함." },
      { p: ["gilels"], label: "DG", year: "1975", why: "아마데우스 4중주단과의 녹음. 탄탄하고 활기찬 연주." }
    ],
    am: "Schubert Trout Quintet D. 667 Andantino", related: ["schubert-winterreise"], terms: ["variation"]
  },

  /* ---------------- CHOPIN ---------------- */
  {
    id: "chopin-nocturne-op9-2", composer: "chopin", ko: "녹턴 2번", en: "Nocturne in E-flat major",
    year: "1830–1832", key: "Eb major", meter: "12/8", genre: ["nocturne"], cat: [{ s: "op", t: "Op. 9 No. 2" }],
    instr: "피아노 독주",
    movements: [["Andante", "단일 악장"]],
    bg: "파리 정착 초기인 1832년에 출판된 세 곡의 녹턴 Op. 9 중 두 번째 곡입니다. 쇼팽의 작품 가운데 가장 널리 알려진 곡 중 하나이며, 존 필드의 녹턴 양식을 이어받아 더 풍부한 화성과 장식으로 발전시켰습니다.",
    points: ["왼손: 낮은 베이스음 하나와 그 위의 화음이 일정하게 흔들리는 반주(12/8박자).", "오른손: 같은 선율이 돌아올 때마다 장식이 점점 화려해집니다. 성악가의 즉흥 장식을 떠올려 보세요.", "끝부분 카덴차 같은 빠른 장식 뒤 조용히 사라지는 마무리.", "읽는 법: ‘Op. 9 No. 2’는 작품번호 9로 묶인 세 곡 가운데 두 번째라는 뜻입니다."],
    recs: [
      { p: ["rubinstein"], label: "RCA", year: "1965", why: "과장 없는 자연스러운 루바토와 기품. 쇼팽 녹턴 전집의 고전." },
      { p: ["pires"], label: "DG", year: "1996", why: "내밀하고 사색적인 해석으로 높이 평가받는 녹턴 전집." },
      { p: ["arrau"], label: "Philips", why: "느린 템포와 깊고 풍부한 음색." }
    ],
    am: "Chopin Nocturne Op. 9 No. 2 E-flat major", related: ["chopin-waltz-op64-2", "schubert-impromptus-d899"], terms: ["rubato", "andante"]
  },
  {
    id: "chopin-ballade-1", composer: "chopin", ko: "발라드 1번", en: "Ballade No. 1",
    year: "1831–1835", key: "G minor", meter: "6/4", genre: ["ballade"], cat: [{ s: "op", t: "Op. 23" }],
    instr: "피아노 독주",
    movements: [["Largo – Moderato – … – Presto con fuoco", "단일 악장"]],
    bg: "빈 체류 시절 구상해 파리에서 완성, 1836년 출판했습니다. 피아노곡에 ‘발라드’라는 이름을 붙인 첫 작품입니다. 영화 〈피아니스트〉(2002)에 등장하며 더 유명해졌습니다.",
    points: ["‘질문하는 듯’ 끝나는 서주의 불협화음.", "1주제(G단조, 쓸쓸한 왈츠풍)와 2주제(E♭장조, 따뜻한 노래)가 형태를 바꾸며 돌아옵니다.", "마지막 ‘Presto con fuoco(불같이 빠르게)’ 코다의 폭발적인 기교."],
    recs: [
      { p: ["zimerman"], label: "DG", year: "1987", why: "정교한 구조와 극적인 긴장으로 발라드 녹음의 기준점이 된 음반." },
      { p: ["horowitz"], label: "여러 레이블", why: "강렬한 음색 대비와 극적인 개성." },
      { p: ["cho"], label: "DG", year: "2016", why: "2015년 쇼팽 콩쿠르 우승 후 데뷔 앨범. 정제되고 시적인 해석." }
    ],
    am: "Chopin Ballade No. 1 in G minor Op. 23", related: ["chopin-polonaise-op53", "liszt-sonata"], terms: ["coda"]
  },
  {
    id: "chopin-waltz-op64-2", composer: "chopin", ko: "왈츠 7번", en: "Waltz in C-sharp minor",
    year: "1846–1847", key: "C# minor", meter: "3/4", genre: ["waltz"], cat: [{ s: "op", t: "Op. 64 No. 2" }],
    instr: "피아노 독주",
    movements: [["Tempo giusto – Più mosso – Più lento", "단일 악장"]],
    bg: "생전에 마지막으로 출판된 작품 가운데 하나입니다. 같은 Op. 64의 1번이 ‘강아지 왈츠’로 불리는 D♭장조 왈츠입니다.",
    points: ["춤을 위한 왈츠가 아니라 감상용 시적 왈츠 — 우수에 찬 단조.", "세 가지 성격의 부분이 교대합니다: 우울한 주제, 빠르게 회전하는 패시지, 장조의 따뜻한 중간부."],
    recs: [
      { p: ["lipatti"], label: "EMI", year: "1950", why: "33세로 요절한 피아니스트의 기품 있는 왈츠 전곡 녹음." },
      { p: ["rubinstein"], label: "RCA", why: "자연스럽고 우아한 리듬 감각." }
    ],
    am: "Chopin Waltz Op. 64 No. 2 C-sharp minor", related: ["chopin-nocturne-op9-2"], terms: ["rubato"]
  },
  {
    id: "chopin-etude-op10-3", composer: "chopin", ko: "에튀드 Op. 10 No. 3 〈이별의 곡〉", en: "Étude in E major", nick: "Tristesse",
    year: "1832", key: "E major", genre: ["etude"], cat: [{ s: "op", t: "Op. 10 No. 3" }],
    instr: "피아노 독주",
    movements: [["Lento ma non troppo", "느리게, 지나치지 않게"]],
    bg: "12곡의 연습곡집 Op. 10(1833년 출판, 리스트에게 헌정) 중 세 번째 곡입니다. 한국과 일본에서는 ‘이별의 곡’, 영어권에서는 ‘Tristesse(슬픔)’라는 별명으로 불리지만 모두 쇼팽이 붙인 이름은 아닙니다. 쇼팽이 제자에게 ‘이렇게 아름다운 선율은 다시 쓰지 못했다’고 말했다는 일화가 전해집니다.",
    points: ["연습 목표: 한 손 안에서 선율(윗성부)과 반주를 동시에 다른 음량으로 연주하기.", "고요한 선율 뒤의 중간부에서 감7화음이 쏟아지는 격렬한 대목."],
    recs: [
      { p: ["pollini"], label: "DG", year: "1972", why: "완벽한 기교와 명료함으로 연습곡 녹음의 기준이 된 음반." },
      { p: ["ashkenazy"], label: "Decca", why: "서정성과 기교의 균형." }
    ],
    am: "Chopin Etude Op. 10 No. 3 E major Tristesse", related: ["liszt-la-campanella", "chopin-nocturne-op9-2"], terms: ["lento"]
  },
  {
    id: "chopin-polonaise-op53", composer: "chopin", ko: "폴로네이즈 6번 〈영웅〉", en: "Polonaise in A-flat major", nick: "Heroic",
    year: "1842", key: "Ab major", meter: "3/4", genre: ["polonaise"], cat: [{ s: "op", t: "Op. 53" }],
    instr: "피아노 독주",
    movements: [["Maestoso", "장엄하게"]],
    bg: "쇼팽의 폴로네이즈 중 가장 유명한 곡입니다. ‘영웅’이라는 별명은 쇼팽이 붙인 것이 아니며, 폴란드의 영광과 자부심을 상징하는 곡으로 받아들여져 왔습니다.",
    points: ["반음계로 상승하는 긴장감 넘치는 서주.", "중간부: 왼손 옥타브가 쉼 없이 반복되며 질주하는 말발굽(또는 기병대)을 연상시킵니다.", "폴로네이즈 특유의 리듬형을 찾아보세요."],
    recs: [
      { p: ["rubinstein"], label: "RCA", why: "폴란드 출신 피아니스트의 위엄 있고 당당한 해석." },
      { p: ["horowitz"], label: "여러 레이블", why: "압도적인 음량과 기교." }
    ],
    am: "Chopin Polonaise Op. 53 Heroic A-flat major", related: ["chopin-ballade-1"], terms: ["maestoso"]
  },
  {
    id: "chopin-pc1", composer: "chopin", ko: "피아노 협주곡 1번", en: "Piano Concerto No. 1",
    year: "1830", key: "E minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 11" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Allegro maestoso", "당당하게 빠르게"], ["Romance: Larghetto", "로망스"], ["Rondo: Vivace", "론도"]],
    bg: "폴란드를 떠나기 직전인 1830년 바르샤바 고별 연주회에서 쇼팽이 직접 초연했습니다. 실제로는 2번(Op. 21)보다 나중에 작곡되었지만 먼저 출판되어 ‘1번’이 되었습니다 — Op. 번호가 출판 순서를 따른다는 좋은 예입니다.",
    points: ["오케스트라가 길게 주제를 제시한 뒤에야 피아노가 등장합니다.", "2악장 로망스: 쇼팽은 편지에서 이 악장을 ‘아름다운 봄날 달밤의 몽상’이라고 표현했습니다.", "3악장: 폴란드 민속 춤 크라코비아크의 리듬."],
    recs: [
      { p: ["argerich"], label: "DG", year: "1968", why: "클라우디오 아바도 지휘 런던 심포니. 젊은 아르헤리치의 불꽃 같은 연주." },
      { p: ["zimerman"], label: "DG", year: "1999", why: "직접 창단한 폴란드 페스티벌 오케스트라를 지휘하며 연주. 느리고 극도로 섬세한 독자적 해석." },
      { p: ["cho"], label: "DG", year: "2016", why: "잔안드레아 노세다 지휘 런던 심포니. 맑고 정제된 음색." }
    ],
    am: "Chopin Piano Concerto No. 1 Op. 11 Romance Larghetto", related: ["mozart-pc21", "rachmaninoff-pc2"], terms: ["rondo", "maestoso"]
  },

  /* ---------------- LISZT ---------------- */
  {
    id: "liszt-liebestraum-3", composer: "liszt", ko: "사랑의 꿈 3번", en: "Liebestraum No. 3",
    year: "1850", key: "Ab major", genre: [], cat: [{ s: "s", t: "S. 541/3" }],
    instr: "피아노 독주",
    movements: [["Poco allegro, con affetto", "조금 빠르게, 애정을 담아"]],
    bg: "세 곡의 〈사랑의 꿈〉은 원래 리스트 자신의 가곡을 피아노곡으로 편곡한 것입니다. 3번은 프라일리그라트의 시 ‘사랑할 수 있는 한 사랑하라’에 붙인 가곡이 원곡입니다.",
    points: ["가운데 음역에서 노래하는 선율을 양손이 나눠 맡고, 그 위아래로 아르페지오가 감쌉니다.", "곡 중간 두 번의 화려한 카덴차."],
    recs: [
      { p: ["bolet"], label: "Decca", why: "리스트 해석으로 이름난 피아니스트의 넉넉하고 따뜻한 연주." }
    ],
    am: "Liszt Liebestraum No. 3 S. 541", related: ["liszt-consolation-3", "chopin-nocturne-op9-2"], terms: ["cadenza", "transcription"]
  },
  {
    id: "liszt-hungarian-2", composer: "liszt", ko: "헝가리 광시곡 2번", en: "Hungarian Rhapsody No. 2",
    year: "1847", key: "C# minor", genre: [], cat: [{ s: "s", t: "S. 244/2" }],
    instr: "피아노 독주 (관현악 편곡판도 있음)",
    movements: [["Lassan", "느린 부분"], ["Friska", "빠른 부분"]],
    bg: "리스트가 헝가리에서 들은 집시 악단(베르분코시 양식)의 음악에서 영감을 받은 19곡의 광시곡 가운데 가장 유명한 곡입니다. 만화 영화에 자주 쓰여 익숙한 선율입니다.",
    points: ["느리고 즉흥적인 ‘라산’에서 점점 빨라지는 ‘프리스카’로 — 헝가리 춤 차르다시의 구조.", "해머로 현을 두드리는 헝가리 악기 침발롬과 집시 바이올린의 소리를 피아노로 흉내 냅니다.", "리스트는 카덴차 부분을 연주자가 즉흥으로 채울 수 있게 했고, 라흐마니노프와 호로비츠도 자기만의 카덴차를 남겼습니다."],
    recs: [
      { p: ["cziffra"], label: "EMI", why: "헝가리 출신 비르투오소의 불꽃 같은 기교." },
      { p: ["horowitz"], label: "여러 레이블", why: "자신이 편곡한 버전. 극적이고 화려한 개성." }
    ],
    am: "Liszt Hungarian Rhapsody No. 2 S. 244", related: ["liszt-la-campanella"], terms: ["rhapsody", "cadenza"]
  },
  {
    id: "liszt-la-campanella", composer: "liszt", ko: "라 캄파넬라", en: "La campanella (Grandes études de Paganini No. 3)",
    year: "1851 (개정판)", key: "G# minor", genre: ["etude"], cat: [{ s: "s", t: "S. 141/3" }],
    instr: "피아노 독주",
    movements: [["Allegretto", "조금 빠르게"]],
    bg: "‘작은 종’이라는 뜻으로, 파가니니의 바이올린 협주곡 2번 마지막 악장의 주제를 피아노 연습곡으로 편곡했습니다. 1838년판을 개정해 1851년 〈파가니니에 의한 대연습곡〉으로 출판했습니다.",
    points: ["오른손이 높은 D#음(종소리)과 선율 사이를 큰 폭으로 반복해 도약합니다.", "바이올린의 기교를 피아노로 ‘번역’하려는 리스트의 시도를 들어 보세요."],
    recs: [
      { p: ["cziffra"], label: "EMI", why: "경쾌하고 화려한 기교." },
      { p: ["kissin"], label: "RCA", why: "정확하고 반짝이는 음색." }
    ],
    am: "Liszt La Campanella S. 141", related: ["chopin-etude-op10-3", "rachmaninoff-paganini"], terms: ["transcription"]
  },
  {
    id: "liszt-sonata", composer: "liszt", ko: "피아노 소나타 B단조", en: "Piano Sonata in B minor",
    year: "1852–1853", key: "B minor", genre: ["sonata"], cat: [{ s: "s", t: "S. 178" }],
    instr: "피아노 독주",
    movements: [["Lento assai – Allegro energico – … – Andante sostenuto – … – Lento assai", "단일 악장 (약 30분)"]],
    bg: "로베르트 슈만에게 헌정된 리스트의 유일한 피아노 소나타입니다. 30분 가량의 단일 악장이지만, 그 안에 여러 악장의 성격과 하나의 거대한 소나타 형식이 겹쳐 있다는 해석이 일반적입니다. 초연 당시 평론가 한슬리크에게 혹평받았지만 지금은 낭만주의 피아노 음악의 최고봉으로 꼽힙니다.",
    points: ["처음 등장하는 몇 개의 짧은 동기가 서정적·악마적·영웅적 성격으로 끊임없이 변형됩니다(‘주제 변형’).", "조용히 시작해 조용히 끝나는 수미상관 구조."],
    recs: [
      { p: ["zimerman"], label: "DG", year: "1990", why: "구조적 통일성과 극적 긴장을 동시에 잡은 기념비적 녹음." },
      { p: ["argerich"], label: "DG", year: "1971", why: "폭발적인 에너지와 즉흥성." },
      { p: ["horowitz"], label: "HMV / EMI", year: "1932", why: "이 곡의 첫 녹음. 역사적 가치가 큰 연주." }
    ],
    am: "Liszt Piano Sonata in B minor S. 178", related: ["chopin-ballade-1", "schubert-d960"], terms: ["thematic-transformation"]
  },
  {
    id: "liszt-consolation-3", composer: "liszt", ko: "위안 3번", en: "Consolation No. 3",
    year: "1849–1850", key: "Db major", genre: ["nocturne"], cat: [{ s: "s", t: "S. 172/3" }],
    instr: "피아노 독주",
    movements: [["Lento placido", "느리고 평온하게"]],
    bg: "여섯 곡의 〈위안〉 가운데 가장 많이 연주되는 곡입니다. 쇼팽의 녹턴과 비슷한 서정적 분위기를 지녀, 화려한 기교로 유명한 리스트의 다른 얼굴을 보여줍니다.",
    points: ["왼손의 잔잔하게 흔들리는 반주 위의 조용한 노래.", "쇼팽 [[w:chopin-nocturne-op9-2|녹턴 Op. 9 No. 2]]와 비교해 들어 보세요."],
    recs: [],
    am: "Liszt Consolation No. 3 S. 172", related: ["liszt-liebestraum-3", "chopin-nocturne-op9-2"], terms: ["lento"]
  },

  /* ---------------- TCHAIKOVSKY ---------------- */
  {
    id: "tchaikovsky-swan-lake", composer: "tchaikovsky", ko: "발레 〈백조의 호수〉", en: "Swan Lake (Лебединое озеро)",
    year: "1875–1876", key: "B minor", keyNote: "‘정경’ 주제 기준", genre: ["ballet", "suite"], cat: [{ s: "op", t: "Op. 20" }],
    instr: "오케스트라",
    movements: [["Act I–IV", "4막 발레"], ["Scène (Act II)", "정경 — 백조의 주제"], ["Danse des petits cygnes", "작은 백조들의 춤"]],
    bg: "차이콥스키의 첫 발레로, 1877년 모스크바 볼쇼이 극장에서 초연되었지만 반응은 미지근했습니다. 작곡가 사후인 1895년 상트페테르부르크에서 프티파와 이바노프의 새 안무로 재공연되면서 고전 발레의 상징이 되었습니다.",
    points: ["오보에가 부르는 애절한 ‘백조의 주제’ — 하프의 물결 같은 반주 위에서.", "‘작은 백조들의 춤’: 네 명의 무용수가 팔짱을 끼고 추는, 바순의 스타카토 반주가 귀여운 곡."],
    recs: [
      { p: ["previn"], label: "EMI", year: "1976", why: "런던 심포니와의 전곡 녹음. 극적이고 생생한 무대감." },
      { p: ["dutoit"], label: "Decca", why: "몬트리올 심포니. 세련되고 투명한 음향." },
      { p: ["karajan"], label: "Decca", year: "1965", why: "빈 필과의 모음곡 녹음. 화려하고 우아한 사운드." }
    ],
    am: "Tchaikovsky Swan Lake Op. 20 Scene", related: ["tchaikovsky-nutcracker"], terms: []
  },
  {
    id: "tchaikovsky-nutcracker", composer: "tchaikovsky", ko: "발레 〈호두까기 인형〉", en: "The Nutcracker (Щелкунчик)",
    year: "1891–1892", key: "Bb major", keyNote: "서곡 기준", genre: ["ballet", "suite"], cat: [{ s: "op", t: "Op. 71" }, { s: "op", t: "Op. 71a (모음곡)" }],
    instr: "오케스트라 (첼레스타 포함) · 어린이 합창",
    movements: [["Miniature Overture", "작은 서곡"], ["March", "행진곡"], ["Dance of the Sugar Plum Fairy", "사탕 요정의 춤"], ["Waltz of the Flowers", "꽃의 왈츠"], ["Trepak (Russian Dance)", "트레팍"]],
    bg: "E. T. A. 호프만의 동화를 바탕으로 한 2막 발레로, 1892년 12월 상트페테르부르크 마린스키 극장에서 초연되었습니다. 초연에 앞서 발레의 주요 곡을 묶은 〈모음곡〉 Op. 71a가 먼저 발표되어 큰 인기를 끌었습니다.",
    points: ["‘사탕 요정의 춤’: 차이콥스키가 파리에서 발견해 러시아로 가져온 신악기 첼레스타의 반짝이는 소리.", "Op. 71(발레 전곡)과 Op. 71a(모음곡) — 같은 음악에 붙은 번호의 차이를 보세요.", "연말 공연의 고정 레퍼토리로 전 세계에서 사랑받습니다."],
    recs: [
      { p: ["previn"], label: "EMI", year: "1972", why: "런던 심포니와의 전곡 녹음. 생기 있고 극적인 연주." },
      { p: ["gergiev"], label: "Philips", year: "1998", why: "마린스키(키로프) 오케스트라. 초연 극장 오케스트라의 생생한 러시아적 색채." },
      { p: ["dorati"], label: "Philips", year: "1975", why: "콘세르트헤바우 오케스트라. 발레 음악의 대가다운 균형감." }
    ],
    am: "Tchaikovsky Nutcracker Dance of the Sugar Plum Fairy", related: ["tchaikovsky-swan-lake"], terms: ["celesta"]
  },
  {
    id: "tchaikovsky-pc1", composer: "tchaikovsky", ko: "피아노 협주곡 1번", en: "Piano Concerto No. 1",
    year: "1874–1875", key: "Bb minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 23" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Allegro non troppo e molto maestoso – Allegro con spirito", "장엄하게"], ["Andantino semplice – Prestissimo", "소박하게"], ["Allegro con fuoco", "불같이 빠르게"]],
    bg: "스승 니콜라이 루빈시테인에게 들려주었다가 ‘연주할 수 없는 곡’이라는 혹평을 받았습니다. 차이콥스키는 곡을 거의 고치지 않고 한스 폰 뷜로에게 헌정했고, 뷜로는 1875년 미국 보스턴에서 초연해 큰 성공을 거두었습니다. 이후 루빈시테인도 이 곡을 연주했습니다.",
    points: ["호른의 팡파르와 피아노의 거대한 화음으로 시작하는 유명한 서주 — 그런데 이 주제는 곡에서 다시 돌아오지 않습니다.", "3악장: 우크라이나 민요에서 가져온 춤곡풍 주제."],
    recs: [
      { p: ["cliburn"], label: "RCA", year: "1958", why: "냉전 중 모스크바 차이콥스키 콩쿠르 우승 직후 녹음. 클래식 음반 최초로 100만 장 넘게 팔린 것으로 알려진 역사적 음반." },
      { p: ["argerich"], label: "Philips", year: "1980 (라이브)", why: "키릴 콘드라신 지휘. 폭발적 에너지의 실황 녹음." },
      { p: ["horowitz"], label: "RCA", year: "1943 (라이브)", why: "장인 토스카니니 지휘 NBC 심포니. 전설적인 속도와 박력." }
    ],
    am: "Tchaikovsky Piano Concerto No. 1 Op. 23 Allegro non troppo", related: ["rachmaninoff-pc2", "tchaikovsky-violin-concerto"], terms: ["maestoso"]
  },
  {
    id: "tchaikovsky-symphony-6", composer: "tchaikovsky", ko: "교향곡 6번 〈비창〉", en: "Symphony No. 6 'Pathétique'", nick: "Pathétique",
    year: "1893", key: "B minor", genre: ["symphony"], cat: [{ s: "op", t: "Op. 74" }],
    instr: "오케스트라",
    movements: [["Adagio – Allegro non troppo", "느린 서주 – 빠르게"], ["Allegro con grazia", "5/4박자의 왈츠"], ["Allegro molto vivace", "행진곡풍 스케르초"], ["Finale: Adagio lamentoso", "느리게, 탄식하듯"]],
    bg: "1893년 10월 28일 상트페테르부르크에서 차이콥스키 자신의 지휘로 초연되었고, 그는 9일 뒤 세상을 떠났습니다. 러시아어 원제 ‘Патетическая’는 ‘열정적인, 감정이 넘치는’에 가까운 뜻이라는 지적도 있습니다.",
    points: ["2악장: 다섯 박자로 된 ‘절뚝이는 왈츠’ — [[th:time-signature|박자]]의 효과를 체험하기 좋은 곡.", "3악장의 승리감 넘치는 행진곡이 끝나면 박수가 나오곤 하지만, 곡은 아직 끝나지 않았습니다.", "느린 악장으로 끝나는 파격: 마지막엔 첼로·베이스가 아주 여리게 사라집니다."],
    recs: [
      { p: ["mravinsky"], label: "DG", year: "1960", why: "레닌그라드 필하모닉. 냉철하고 엄격한 긴장감으로 이 곡의 기준점으로 꼽힙니다." },
      { p: ["karajan"], label: "DG", why: "베를린 필의 풍부하고 극적인 음향. 여러 차례 녹음했습니다." },
      { p: ["currentzis"], label: "Sony Classical", year: "2017", why: "무지카 에테르나. 극단적인 셈여림 대비의 도발적인 현대적 해석." }
    ],
    am: "Tchaikovsky Symphony No. 6 Pathetique Op. 74 Adagio lamentoso", related: ["beethoven-pathetique", "tchaikovsky-pc1"], terms: ["lamentoso"]
  },
  {
    id: "tchaikovsky-violin-concerto", composer: "tchaikovsky", ko: "바이올린 협주곡", en: "Violin Concerto",
    year: "1878", key: "D major", genre: ["concerto"], cat: [{ s: "op", t: "Op. 35" }],
    instr: "바이올린 독주 · 오케스트라",
    movements: [["Allegro moderato", "보통 빠르게"], ["Canzonetta: Andante", "칸초네타 — 작은 노래"], ["Finale: Allegro vivacissimo", "매우 생기 있게"]],
    bg: "스위스 제네바 호수 근처에서 약 한 달 만에 작곡했습니다. 초연(1881, 빈)은 평론가 한슬리크에게 ‘악취가 나는 음악’이라는 혹평을 받았지만, 오늘날 가장 사랑받는 바이올린 협주곡 중 하나입니다.",
    points: ["2악장 칸초네타: 약음기를 낀 바이올린의 우수 어린 노래.", "2악장에서 쉼 없이 3악장으로 넘어가 러시아 민속 춤 같은 피날레가 폭발합니다."],
    recs: [
      { p: ["heifetz"], label: "RCA", year: "1957", why: "프리츠 라이너 지휘 시카고 심포니. 빠르고 날카로운 기교의 극치." },
      { p: ["chung"], label: "Decca", year: "1970", why: "앙드레 프레빈 지휘 런던 심포니. 22세 정경화의 데뷔 음반으로 국제적 명성을 안겨 준 녹음." },
      { p: ["oistrakh"], label: "여러 레이블", why: "따뜻하고 넉넉한 러시아 바이올린 전통." }
    ],
    am: "Tchaikovsky Violin Concerto Op. 35 Canzonetta", related: ["beethoven-violin-concerto", "tchaikovsky-pc1"], terms: ["con-sordino"]
  },

  /* ---------------- RACHMANINOFF ---------------- */
  {
    id: "rachmaninoff-pc2", composer: "rachmaninoff", ko: "피아노 협주곡 2번", en: "Piano Concerto No. 2",
    year: "1900–1901", key: "C minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 18" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Moderato", "보통 빠르게"], ["Adagio sostenuto", "느리게, 음을 끌며"], ["Allegro scherzando", "빠르고 익살스럽게"]],
    bg: "교향곡 1번의 실패로 깊은 우울에 빠졌던 라흐마니노프가 니콜라이 달 박사의 치료를 받은 뒤 완성한 곡으로, 달 박사에게 헌정되었습니다. 작곡가 자신의 독주로 초연되어 대성공을 거두었고, 영화 〈밀회〉(1945) 등에 쓰이며 더욱 유명해졌습니다.",
    points: ["피아노 혼자 점점 커지는 여덟 개의 화음으로 시작 — 종소리처럼 들립니다.", "2악장: 플루트와 클라리넷이 이어받는 꿈꾸는 듯한 선율.", "3악장 마지막, 오케스트라 전체가 부르는 거대한 서정 주제."],
    recs: [
      { p: ["rachmaninoff-p"], label: "RCA Victor", year: "1929", why: "레오폴드 스토코프스키 지휘 필라델피아 오케스트라와 작곡가 자신의 연주. 생각보다 빠르고 담백한 템포가 놀랍습니다." },
      { p: ["richter"], label: "DG", year: "1959", why: "스타니스와프 비스워츠키 지휘 바르샤바 필. 극도로 느린 서주의 압도적인 해석." },
      { p: ["zimerman"], label: "DG", year: "2000", why: "오자와 세이지 지휘 보스턴 심포니. 정교하고 풍부한 음향." }
    ],
    am: "Rachmaninoff Piano Concerto No. 2 Op. 18 Moderato", related: ["rachmaninoff-pc3", "tchaikovsky-pc1"], terms: ["sostenuto"]
  },
  {
    id: "rachmaninoff-pc3", composer: "rachmaninoff", ko: "피아노 협주곡 3번", en: "Piano Concerto No. 3",
    year: "1909", key: "D minor", genre: ["concerto"], cat: [{ s: "op", t: "Op. 30" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Allegro ma non tanto", "빠르게, 너무 지나치지 않게"], ["Intermezzo: Adagio", "간주곡"], ["Finale: Alla breve", "피날레"]],
    bg: "첫 미국 순회 연주를 위해 작곡해 1909년 뉴욕에서 초연했습니다. 협주곡 가운데 가장 어려운 곡 중 하나로 꼽히며, 영화 〈샤인〉(1996)의 소재가 되었습니다.",
    points: ["피아노가 소박한 민요 같은 단선율로 조용히 시작하는 첫머리.", "1악장 카덴차: 작곡가가 쓴 두 가지 버전(무겁고 거대한 ‘오시아’판과 가벼운 판) 중 무엇을 고르는지 비교해 보세요."],
    recs: [
      { p: ["horowitz"], label: "RCA", year: "1978 (라이브)", why: "유진 오먼디 지휘 뉴욕 필. 이 곡을 상징하는 피아니스트의 실황." },
      { p: ["argerich"], label: "Philips", year: "1982 (라이브)", why: "리카르도 샤이 지휘. 폭발적인 추진력." },
      { p: ["ashkenazy"], label: "Decca", why: "앙드레 프레빈 지휘 런던 심포니. 균형 잡힌 서정성." }
    ],
    am: "Rachmaninoff Piano Concerto No. 3 Op. 30 Allegro ma non tanto", related: ["rachmaninoff-pc2"], terms: ["cadenza", "ossia"]
  },
  {
    id: "rachmaninoff-vocalise", composer: "rachmaninoff", ko: "보칼리제", en: "Vocalise",
    year: "1912 (1915 개정)", key: "C# minor", genre: ["lied"], cat: [{ s: "op", t: "Op. 34 No. 14" }],
    instr: "성악(소프라노/테너) · 피아노 — 관현악·기악 편곡판 다수",
    movements: [["Lentamente. Molto cantabile", "느리게, 아주 노래하듯"]],
    bg: "14곡의 가곡집 Op. 34의 마지막 곡으로, 가사 없이 하나의 모음으로만 부르는 노래입니다. 라흐마니노프 자신이 관현악 판으로 편곡했으며, 첼로·바이올린 등 수많은 악기로 연주됩니다.",
    points: ["가사가 없어 오직 선율의 곡선과 호흡만으로 감정을 전합니다.", "같은 곡을 성악·첼로·관현악 버전으로 비교해 들어 보세요. 음색이 감정을 얼마나 바꾸는지 알 수 있습니다."],
    recs: [],
    am: "Rachmaninoff Vocalise Op. 34 No. 14", related: ["rachmaninoff-pc2"], terms: ["cantabile"]
  },
  {
    id: "rachmaninoff-prelude-op3-2", composer: "rachmaninoff", ko: "전주곡 C♯단조", en: "Prelude in C-sharp minor", nick: "The Bells of Moscow",
    year: "1892", key: "C# minor", genre: ["prelude"], cat: [{ s: "op", t: "Op. 3 No. 2" }],
    instr: "피아노 독주",
    movements: [["Lento – Agitato – Tempo primo", "느리게 – 격하게 – 처음 빠르기로"]],
    bg: "19세 때 쓴 곡으로, 발표 직후 엄청난 인기를 얻어 라흐마니노프가 연주회마다 앙코르 요청을 받을 정도였습니다. 정작 그는 이 곡만 찾는 청중에게 지쳤다고 전해집니다. 출판 계약 탓에 이 곡으로 큰 수입을 얻지는 못했습니다.",
    points: ["‘라-솔#-도#’ 세 음이 강하게 울리는 첫머리 — 큰 종소리를 떠올리게 합니다.", "마지막 부분은 4단 악보로 쓰여 있을 만큼 두텁고 거대한 화음."],
    recs: [
      { p: ["rachmaninoff-p"], label: "RCA Victor", why: "작곡가 자신의 녹음." },
      { p: ["ashkenazy"], label: "Decca", why: "전주곡 전곡 녹음." }
    ],
    am: "Rachmaninoff Prelude in C-sharp minor Op. 3 No. 2", related: ["rachmaninoff-pc2", "debussy-preludes-1"], terms: ["agitato"]
  },
  {
    id: "rachmaninoff-paganini", composer: "rachmaninoff", ko: "파가니니 주제에 의한 랩소디", en: "Rhapsody on a Theme of Paganini",
    year: "1934", key: "A minor", genre: ["variations", "concerto"], cat: [{ s: "op", t: "Op. 43" }],
    instr: "피아노 독주 · 오케스트라",
    movements: [["Introduction – Variation I – Theme – Variations II–XXIV", "서주, 주제와 24개의 변주"]],
    bg: "파가니니의 무반주 바이올린 카프리스 24번 주제로 만든 변주곡입니다. 1934년 볼티모어에서 작곡가 자신의 독주로 초연되었습니다. 리스트·브람스도 같은 주제로 변주곡을 썼습니다.",
    points: ["주제보다 1변주가 먼저 나오는 독특한 시작.", "제18변주: 파가니니 주제를 거꾸로 뒤집고(전위) 장조로 바꿔 느리게 연주하면 이 유명한 서정적 선율이 됩니다.", "중세 성가 ‘디에스 이레(진노의 날)’ 선율이 여러 변주에 숨어 있습니다."],
    recs: [
      { p: ["rachmaninoff-p"], label: "RCA Victor", year: "1934", why: "초연 직후 스토코프스키 지휘 필라델피아 오케스트라와의 녹음." },
      { p: ["ashkenazy"], label: "Decca", why: "앙드레 프레빈 지휘 런던 심포니." }
    ],
    am: "Rachmaninoff Rhapsody on a Theme of Paganini Variation 18", related: ["liszt-la-campanella", "bach-goldberg"], terms: ["variation", "inversion", "rhapsody"]
  },

  /* ---------------- DEBUSSY ---------------- */
  {
    id: "debussy-clair-de-lune", composer: "debussy", ko: "달빛 (〈베르가마스크 모음곡〉 3곡)", en: "Clair de lune (Suite bergamasque)",
    year: "c. 1890 작곡 · 1905 출판", key: "Db major", meter: "9/8", genre: ["suite"], cat: [{ s: "l", t: "L. 75" }],
    instr: "피아노 독주",
    movements: [["Prélude", "전주곡"], ["Menuet", "미뉴에트"], ["Clair de lune: Andante très expressif", "달빛"], ["Passepied", "파스피에"]],
    bg: "젊은 시절 작곡하고 15년쯤 뒤 손질해 출판한 네 곡의 모음곡 중 세 번째 곡입니다. 제목은 폴 베를렌의 시 ‘달빛’에서 왔으며, ‘베르가마스크’라는 말도 같은 시에 나옵니다.",
    points: ["매우 여리게(pp) 시작해, 박자가 흐려진 듯한 리듬으로 떠다니는 선율.", "중간부에서 아르페지오가 물결처럼 흐르며 셈여림이 커지는 부분.", "고전적 모음곡 형식(미뉴에트·파스피에) 안에 담긴 새로운 화성 감각."],
    recs: [
      { p: ["gieseking"], label: "EMI", year: "1950년대", why: "드뷔시 피아노 음악 녹음의 고전. 투명하고 섬세한 음색." },
      { p: ["cho"], label: "DG", year: "2017", why: "드뷔시 앨범. 맑고 절제된 시정." }
    ],
    am: "Debussy Clair de lune Suite bergamasque", related: ["debussy-arabesque-1", "chopin-nocturne-op9-2"], terms: ["pp"]
  },
  {
    id: "debussy-arabesque-1", composer: "debussy", ko: "아라베스크 1번", en: "Arabesque No. 1 (Deux arabesques)",
    year: "1888–1891", key: "E major", genre: [], cat: [{ s: "l", t: "L. 66" }],
    instr: "피아노 독주",
    movements: [["Andantino con moto", "조금 걷는 빠르기로, 움직임 있게"]],
    bg: "20대의 드뷔시가 쓴 두 곡의 아라베스크 중 첫 곡입니다. 아직 후기 낭만주의의 영향이 남아 있지만, 이미 그의 개성적인 음색이 드러납니다. ‘아라베스크’는 덩굴무늬 장식을 뜻합니다.",
    points: ["양손의 셋잇단음표 아르페지오가 덩굴처럼 얽히며 오르내립니다.", "왼손 셋잇단음표와 오른손 두 음의 엇갈림(2 대 3)."],
    recs: [
      { p: ["gieseking"], label: "EMI", why: "투명하고 흐르는 듯한 음색." }
    ],
    am: "Debussy Arabesque No. 1", related: ["debussy-clair-de-lune"], terms: ["arpeggio"]
  },
  {
    id: "debussy-la-mer", composer: "debussy", ko: "바다", en: "La mer, trois esquisses symphoniques",
    year: "1903–1905", key: "Db major", keyNote: "조성이 유동적", genre: ["symphonic-poem"], cat: [{ s: "l", t: "L. 109" }],
    instr: "대편성 오케스트라",
    movements: [["De l'aube à midi sur la mer", "바다의 새벽부터 정오까지"], ["Jeux de vagues", "파도의 유희"], ["Dialogue du vent et de la mer", "바람과 바다의 대화"]],
    bg: "드뷔시는 ‘세 개의 교향적 스케치’라고 불렀습니다. 1905년 파리에서 초연되었고, 초판 악보 표지에 호쿠사이의 판화 〈가나가와 해변의 높은 파도 아래〉를 넣었습니다. 드뷔시는 바다를 무척 사랑했습니다.",
    points: ["주제를 ‘발전’시키기보다 작은 음형들이 끊임없이 모양을 바꾸며 물결처럼 흘러갑니다.", "1악장 마지막 금관의 장엄한 코랄 — 정오의 햇살.", "음색 그 자체가 주인공입니다. 하프, 약음기 낀 트럼펫, 갈라진 현악기의 색을 들어 보세요."],
    recs: [
      { p: ["karajan"], label: "DG", year: "1964", why: "베를린 필. 매끄럽고 풍성한 관현악의 색채." },
      { p: ["boulez"], label: "DG", year: "1993", why: "클리블랜드 오케스트라. 엑스레이처럼 투명하고 정밀한 해석." },
      { p: ["reiner"], label: "RCA", year: "1960", why: "시카고 심포니. 선명하고 생생한 녹음." }
    ],
    am: "Debussy La Mer Dialogue du vent et de la mer", related: ["debussy-faune"], terms: ["timbre"]
  },
  {
    id: "debussy-faune", composer: "debussy", ko: "목신의 오후에의 전주곡", en: "Prélude à l'après-midi d'un faune",
    year: "1894", key: "E major", keyNote: "조성이 모호하게 시작", genre: ["symphonic-poem"], cat: [{ s: "l", t: "L. 86" }],
    instr: "오케스트라 (플루트 독주, 하프 2, 고음 심벌즈)",
    movements: [["Très modéré", "아주 보통 빠르기로 — 약 10분"]],
    bg: "상징주의 시인 말라르메의 시에서 영감을 받았습니다. 무더운 오후, 반인반수의 목신이 꿈과 현실 사이를 오가는 장면입니다. 작곡가이자 지휘자 피에르 불레즈는 ‘현대 음악은 〈목신의 오후〉의 플루트와 함께 깨어났다’고 말했습니다. 1912년 니진스키가 이 곡으로 만든 발레는 큰 스캔들을 일으켰습니다.",
    points: ["반주 없이 플루트 혼자 부르는 반음계적 선율로 시작 — 박자도 조성도 흐릿합니다.", "곡 전체에서 이 플루트 선율이 계속 다른 화음과 음색으로 돌아옵니다.", "마지막의 고음 심벌즈(앙티크 심벌즈) 소리."],
    recs: [
      { p: ["boulez"], label: "DG", year: "1993", why: "클리블랜드 오케스트라. 정밀하고 투명한 해석." },
      { p: ["karajan"], label: "DG", year: "1964", why: "베를린 필. 감각적이고 풍부한 음향." }
    ],
    am: "Debussy Prelude a l'apres-midi d'un faune", related: ["debussy-la-mer"], terms: ["chromatic"]
  },
  {
    id: "debussy-preludes-1", composer: "debussy", ko: "전주곡집 1권", en: "Préludes, Book I",
    year: "1909–1910", key: "", keyNote: "곡마다 다름", genre: ["prelude"], cat: [{ s: "l", t: "L. 117" }],
    instr: "피아노 독주",
    movements: [["1. Danseuses de Delphes", "델포이의 무희들"], ["2. Voiles", "돛 (또는 베일)"], ["…", "모두 12곡"], ["8. La fille aux cheveux de lin", "아마빛 머리의 소녀"], ["10. La cathédrale engloutie", "가라앉은 성당"]],
    bg: "12곡씩 두 권으로 된 전주곡집의 1권입니다. 쇼팽 전주곡의 전통을 잇지만, 드뷔시는 각 곡의 제목을 곡 끝에 괄호와 말줄임표로 적어 듣는 사람이 먼저 음악으로 상상하게 했습니다.",
    points: ["2곡 ‘돛’: 대부분 온음음계로 쓰여 장·단조의 방향감이 사라진 울림.", "10곡 ‘가라앉은 성당’: 물속에서 떠올랐다 다시 가라앉는 성당 — 페달로 겹쳐진 종소리와 평행 화음.", "8곡 ‘아마빛 머리의 소녀’: 5음음계풍의 소박한 선율."],
    recs: [
      { p: ["michelangeli"], label: "DG", year: "1978", why: "극도로 정밀하게 조절된 음색으로 유명한 녹음." },
      { p: ["zimerman"], label: "DG", year: "1994", why: "1·2권 전곡. 색채의 미세한 층위." },
      { p: ["gieseking"], label: "EMI", why: "역사적인 드뷔시 해석의 기준점." }
    ],
    am: "Debussy Preludes Book 1 La fille aux cheveux de lin", related: ["rachmaninoff-prelude-op3-2", "bach-wtc-1"], terms: ["whole-tone"]
  }
];
