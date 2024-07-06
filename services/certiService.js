const supabase = require('../config/superbase');

// 자격증 추가certi_idx, mem_id,
async function addCerti(user,certi_name,certified_at,certi_org) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .insert([
            {
                mem_id: user.mem_id,
                certi_name: certi_name,
                certified_at: certified_at,
                certi_org: certi_org
            }
        ]);

    if (error) throw error;
    return data;
}

// 자격증 내놔
async function certiSelect(user) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .select('*')
        .eq('mem_id', user.mem_id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// 스케쥴 테이블 임시로 가져오기
async function scheduleCheck(user) {
    const { data, error } = await supabase
        .from('tb_member_schedule')
        .select('*')
        .eq('mem_id', user.mem_id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function option_check(user) {
    const { data, error } = await supabase
        .from('tb_certi_info')
        .select('*')
        .neq('certi_name',user.certi_name);
        

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function certiOrg() {
    const { data, error } = await supabase
        .from('tb_certi_total')
        .select('certi_asso', { distinct: true });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


module.exports = {
    addCerti,
    certiSelect,
    scheduleCheck,
    option_check,
    certiOrg
};