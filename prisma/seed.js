const prisma = require("../src/prisma/prismaClient");

const coverUrls = [
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000050/1-Ji_Ji_Ji-Patricio_Rey_y_sus_Redonditos_de_Ricota_icjeg9.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000049/4-La_Bestia_Pop-Patricio_Rey_y_sus_Redonditos_de_Ricota_p30yfc.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000047/3-Un_Poco_de_Amor_Franc%C3%A9s-Patricio_Rey_y_sus_Redonditos_de_Ricota_eijj2t.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000046/2-Un_%C3%81ngel_para_Tu_Soledad-Patricio_Rey_y_sus_Redonditos_de_Ricota_ggnwxf.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000046/6-Vencedores_Vencidos-Patricio_Rey_y_sus_Redonditos_de_Ricota_tymsmr.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000045/5-Pu%C3%B1aladas-Lauta_Amigo_de_Artistas_Tote_dtcxxq.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000044/8-Todo_un_Palo-Patricio_Rey_y_sus_Redonditos_de_Ricota_oipdn2.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000043/7-Esa_Estrella_Era_Mi_Lujo-Patricio_Rey_y_sus_Redonditos_de_Ricota_bjwlg4.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000041/10-Tarea_Fina-Patricio_Rey_y_sus_Redonditos_de_Ricota_smmiss.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000040/9-SWIM-BTS_bm2q96.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000039/13-Preso_en_Mi_Ciudad-Patricio_Rey_y_sus_Redonditos_de_Ricota_ll8cqv.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000038/12-Cuando_No_Era_Cantante_Remix-El_Bogueto_Anuel_AA_Fuerza_Regida_Yung_Beef_xd6whf.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000037/11-Hab%C3%ADa_una_Vez-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_soxgcg.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000036/15-KOKO-Omar_Courtz_ra7mj9.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000035/14-El_Pibe_de_los_Astilleros-Patricio_Rey_y_sus_Redonditos_de_Ricota_fs7np4.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000034/18-Encuentro_con_un_%C3%81ngel_Amateur-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_juovoz.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000032/17-De_Lejitos_Remix-Jay_Wheeler_Omar_Courtz_fmvs4d.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000031/16-POR_SI_MA%C3%91ANA_NO_ESTOY-Omar_Courtz_bit3hc.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000031/20-La_Hija_del_Fletero-Patricio_Rey_y_sus_Redonditos_de_Ricota_fg2gc3.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000029/19-FOREVER_TU_GANTEL-Omar_Courtz_%C3%91engo_Flow_w9ufyn.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000028/22-Salando_las_Heridas-Patricio_Rey_y_sus_Redonditos_de_Ricota_tuuoog.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000027/21-Juguetes_Perdidos-Patricio_Rey_y_sus_Redonditos_de_Ricota_og1ymo.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000026/24-Una_Piba_Con_la_Remera_de_Greenpeace-Patricio_Rey_y_sus_Redonditos_de_Ricota_cdotxc.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000025/23-UWAIE_versi%C3%B3n_cumbia-Max_Carra_sf1vmw.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000024/27-Coraz%C3%B3n_Sin_Cara-Simon_Aguirre_gture0.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000023/26-La_Noche_Sin_Ti-Los_Huayra_jgkluk.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000022/25-El_Tesoro_de_los_Inocentes-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_jtahwj.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000021/29-Soy_Favela-La_T_y_La_M_mqgyrh.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000020/28-Tu_jard%C3%ADn_con_enanitos-Roze_Oficial_Max_Carra_Valen_RAMKY_EN_LOS_CONTROLES_f7nowo.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000019/32-Pensamientos-Airbag_v7kuj3.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000018/31-Flight_956-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_sergva.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000016/30-Yo_Can%C3%ADbal-Patricio_Rey_y_sus_Redonditos_de_Ricota_jbgqoa.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000015/35-Motor_Psico-Patricio_Rey_y_sus_Redonditos_de_Ricota_zkv9js.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000014/34-LA_VILLA-Ryan_Castro_Kapo_Gangsta_rvtalp.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000013/33-Queso_Ruso-Patricio_Rey_y_sus_Redonditos_de_Ricota_q1vptl.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000012/37-M%C3%BAsica_para_Pastillas-Patricio_Rey_y_sus_Redonditos_de_Ricota_qspx72.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000011/36-Como_Eran_Las_Cosas-Babas%C3%B3nicos_aubuzn.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000010/39-El_Infierno_Est%C3%A1_Encantador_Esta_Noche-Patricio_Rey_y_sus_Redonditos_de_Ricota_qtqfrj.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000009/38-Y_Mientras_Tanto_el_Sol_Se_Muere-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_auldqj.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000009/42-Creo-Callejeros_xlvnzu.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000007/41-Por_Mil_Noches-Airbag_ytjorl.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000006/40-Ca%C3%B1a_Seca_y_un_Membrillo-Patricio_Rey_y_sus_Redonditos_de_Ricota_vme942.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000005/44-Billie_Jean-Michael_Jackson_s5jsin.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000004/43-BAILE_INoLVIDABLE-Bad_Bunny_hpgxmt.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000003/47-NO_LES_DA-Callejero_Fino_Lea_in_the_Mix_bggrlh.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000002/46-Mi_Perro_Dinamita-Patricio_Rey_y_sus_Redonditos_de_Ricota_mfnrdk.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000001/45-Cuando_No_Era_Cantante-El_Bogueto_Yung_Beef_tpghow.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1780999999/49-Amor_de_Vago-La_T_y_La_M_Malandro_ayo6kn.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1781000000/48-Luzbelito_y_las_Sirenas-Patricio_Rey_y_sus_Redonditos_de_Ricota_qbe4ax.jpg",
  "https://res.cloudinary.com/duaannxfp/image/upload/v1780999999/50-A_las_Nueve-No_Te_Va_Gustar_xlvhco.jpg",
];

const audioUrls = [
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002378/2-Un_%C3%81ngel_para_Tu_Soledad-Patricio_Rey_y_sus_Redonditos_de_Ricota_izbcbl.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002373/1-Ji_Ji_Ji-Patricio_Rey_y_sus_Redonditos_de_Ricota_dklzzy.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002372/4-La_Bestia_Pop-Patricio_Rey_y_sus_Redonditos_de_Ricota_htmjm6.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002366/3-Un_Poco_de_Amor_Franc%C3%A9s-Patricio_Rey_y_sus_Redonditos_de_Ricota_ckdafv.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002365/7-Esa_Estrella_Era_Mi_Lujo-Patricio_Rey_y_sus_Redonditos_de_Ricota_vvaqlx.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002360/6-Vencedores_Vencidos-Patricio_Rey_y_sus_Redonditos_de_Ricota_nhcogr.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002359/5-Pu%C3%B1aladas-Lauta_Amigo_de_Artistas_Tote_ethfya.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002353/10-Tarea_Fina-Patricio_Rey_y_sus_Redonditos_de_Ricota_z8hwuf.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002352/9-SWIM-BTS_q2bgwc.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002349/8-Todo_un_Palo-Patricio_Rey_y_sus_Redonditos_de_Ricota_qfjng4.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002345/12-Cuando_No_Era_Cantante_Remix-El_Bogueto_Anuel_AA_Fuerza_Regida_Yung_Beef_ornvaw.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002342/11-Hab%C3%ADa_una_Vez-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_ch9kys.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002336/15-KOKO-Omar_Courtz_rkdise.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002335/14-El_Pibe_de_los_Astilleros-Patricio_Rey_y_sus_Redonditos_de_Ricota_pohmmd.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002329/13-Preso_en_Mi_Ciudad-Patricio_Rey_y_sus_Redonditos_de_Ricota_irv8lc.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002328/17-De_Lejitos_Remix-Jay_Wheeler_Omar_Courtz_ob1ajs.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002324/16-POR_SI_MA%C3%91ANA_NO_ESTOY-Omar_Courtz_mhek8i.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002321/20-La_Hija_del_Fletero-Patricio_Rey_y_sus_Redonditos_de_Ricota_cprmck.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002316/19-FOREVER_TU_GANTEL-Omar_Courtz_%C3%91engo_Flow_unsnml.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002315/18-Encuentro_con_un_%C3%81ngel_Amateur-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_rkdrly.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002310/23-UWAIE_versi%C3%B3n_cumbia-Max_Carra_c1qcdg.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002309/22-Salando_las_Heridas-Patricio_Rey_y_sus_Redonditos_de_Ricota_pxtviz.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002305/21-Juguetes_Perdidos-Patricio_Rey_y_sus_Redonditos_de_Ricota_ydcru2.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002304/26-La_Noche_Sin_Ti-Los_Huayra_vcnnmp.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002299/25-El_Tesoro_de_los_Inocentes-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_ylbcrh.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002298/24-Una_Piba_Con_la_Remera_de_Greenpeace-Patricio_Rey_y_sus_Redonditos_de_Ricota_ky8tvr.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002295/28-Tu_jard%C3%ADn_con_enanitos-Roze_Oficial_Max_Carra_Valen_RAMKY_EN_LOS_CONTROLES_lohsyb.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002291/27-Coraz%C3%B3n_Sin_Cara-Simon_Aguirre_rawuzv.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002290/31-Flight_956-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_yhhcv3.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002286/30-Yo_Can%C3%ADbal-Patricio_Rey_y_sus_Redonditos_de_Ricota_taaspc.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002285/29-Soy_Favela-La_T_y_La_M_gxxckb.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002281/34-LA_VILLA-Ryan_Castro_Kapo_Gangsta_kgjqqn.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002280/33-Queso_Ruso-Patricio_Rey_y_sus_Redonditos_de_Ricota_ostomn.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002276/32-Pensamientos-Airbag_uaotrg.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002275/37-M%C3%BAsica_para_Pastillas-Patricio_Rey_y_sus_Redonditos_de_Ricota_stgm9u.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002272/36-Como_Eran_Las_Cosas-Babas%C3%B3nicos_smndlq.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002269/35-Motor_Psico-Patricio_Rey_y_sus_Redonditos_de_Ricota_ogvvda.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002266/39-El_Infierno_Est%C3%A1_Encantador_Esta_Noche-Patricio_Rey_y_sus_Redonditos_de_Ricota_dcp3nu.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002262/38-Y_Mientras_Tanto_el_Sol_Se_Muere-Indio_Solari_Los_Fundamentalistas_del_Aire_Acondicionado_flfwsz.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002261/42-Creo-Callejeros_layjhe.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002259/41-Por_Mil_Noches-Airbag_xyksoj.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002255/40-Ca%C3%B1a_Seca_y_un_Membrillo-Patricio_Rey_y_sus_Redonditos_de_Ricota_ilboii.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002254/44-Billie_Jean-Michael_Jackson_iobmw6.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002252/43-BAILE_INoLVIDABLE-Bad_Bunny_sjsaze.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002250/46-Mi_Perro_Dinamita-Patricio_Rey_y_sus_Redonditos_de_Ricota_dd74g6.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002249/45-Cuando_No_Era_Cantante-El_Bogueto_Yung_Beef_ly14aa.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002247/47-NO_LES_DA-Callejero_Fino_Lea_in_the_Mix_r7wpee.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002246/50-A_las_Nueve-No_Te_Va_Gustar_b2ch4n.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002246/49-Amor_de_Vago-La_T_y_La_M_Malandro_bqbaun.mp3",
  "https://res.cloudinary.com/duaannxfp/video/upload/v1781002245/48-Luzbelito_y_las_Sirenas-Patricio_Rey_y_sus_Redonditos_de_Ricota_l6oxlf.mp3",
];

function getRankFromUrl(url) {
  const fileName = decodeURIComponent(url.split("/").pop() || "");
  const match = fileName.match(/^(\d+)-/);
  return match ? Number(match[1]) : 999;
}

function parseSongFromUrl(url) {
  const fileName = decodeURIComponent(url.split("/").pop().replace(/\.[^.]+$/, ""));
  const withoutSuffix = fileName.replace(/_[a-z0-9]+$/i, "");
  const withoutRank = withoutSuffix.replace(/^\d+-/, "");
  const parts = withoutRank.split("-");
  const artist = parts.pop().replaceAll("_", " ");
  const name = parts.join("-").replaceAll("_", " ");

  return { name, artist };
}

function getGenre(artist, name) {
  const value = `${artist} ${name}`.toLowerCase();

  if (
    value.includes("patricio rey") ||
    value.includes("indio solari") ||
    value.includes("airbag") ||
    value.includes("babasónicos") ||
    value.includes("callejeros") ||
    value.includes("no te va gustar")
  ) {
    return "Rock Argentino";
  }

  if (
    value.includes("bad bunny") ||
    value.includes("omar courtz") ||
    value.includes("jay wheeler") ||
    value.includes("ñengo flow") ||
    value.includes("ryan castro") ||
    value.includes("kapo") ||
    value.includes("gangsta") ||
    value.includes("el bogueto") ||
    value.includes("anuel") ||
    value.includes("fuerza regida") ||
    value.includes("yung beef") ||
    value.includes("callejero fino") ||
    value.includes("lea in the mix")
  ) {
    return "Urbano Latino";
  }

  if (
    value.includes("la t y la m") ||
    value.includes("max carra") ||
    value.includes("los huayra") ||
    value.includes("roze oficial") ||
    value.includes("simon aguirre")
  ) {
    return "Cumbia";
  }

  if (value.includes("bts")) return "K-Pop";
  if (value.includes("michael jackson")) return "Pop";

  return "Urbano Latino";
}

const coversByRank = new Map(
  coverUrls.map((url) => [getRankFromUrl(url), url])
);

const audiosByRank = new Map(
  audioUrls.map((url) => [getRankFromUrl(url), url])
);

const songs = Array.from({ length: 50 }, (_, index) => {
  const rank = index + 1;
  const image = coversByRank.get(rank);
  const audioUrl = audiosByRank.get(rank);
  const { name, artist } = parseSongFromUrl(image || audioUrl);

  return {
    name,
    artist,
    genre: getGenre(artist, name),
    youtubeId: `top50-argentina-${rank}`,
    image,
    album: "Top 50 Argentina",
    duration: "3:30",
    audioUrl,
  };
});

async function main() {
  try {
    console.log("Limpiando datos previos...");
    await prisma.favoriteSong.deleteMany({});
    await prisma.song.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.user.create({
      data: {
        id: "anonymous",
        email: "anonymous@s-otify.local",
        name: "Anonymous",
        password: "changeme",
      },
    });

    console.log(`Creando ${songs.length} canciones...`);

    for (const song of songs) {
      await prisma.song.create({
        data: song,
      });
    }

    console.log(`Seed completado: ${songs.length} canciones creadas`);
  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();