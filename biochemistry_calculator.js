function test() {
    document.getElementById("stacking_energy_output").innerHTML = "Strand energy: " + "testtesttest" + " kJ/mol";
}

function calc_stacking_energies() {

    const stacking_energies_map = new Map();
    stacking_energies_map.set("CG", -61.0);
    stacking_energies_map.set("CA", -44.0);
    stacking_energies_map.set("CT", -41.0);
    stacking_energies_map.set("GC", -40.5);
    stacking_energies_map.set("GG", -34.6);
    stacking_energies_map.set("GA", -28.4);
    stacking_energies_map.set("TA", -27.5);
    stacking_energies_map.set("GT", -27.5);
    stacking_energies_map.set("AA", -22.5);
    stacking_energies_map.set("AT", -16.0);
    stacking_energies_map.set("TG", -44.0);
    stacking_energies_map.set("AG", -41.0);
    stacking_energies_map.set("CC", -34.6);
    stacking_energies_map.set("TC", -28.4);
    stacking_energies_map.set("AC", -27.5);
    stacking_energies_map.set("TT", -22.5);

    var dna_strand = document.getElementById('dna_strand_energy').value; // whatever data is in the text field
    if (dna_strand.match(/[^GCAT]/)) {
        document.getElementById("stacking_energy_instructions").innerHTML = "Strand contains non-DNA nucleotides. Please re-enter DNA strand 5' to 3' using capital letters.";
    }
    else {
        let dna_strand_length = dna_strand.length;
        let stacked_dna;
        let strand_energy = 0;
        for (let i = 0; i < dna_strand_length - 1; i++) {
            stacked_dna = "";
            stacked_dna += dna_strand[i];
            stacked_dna += dna_strand[i + 1];
            strand_energy += stacking_energies_map.get(stacked_dna);
        }
        document.getElementById("stacking_energy_output").innerHTML = "dsDNA Stacking Energy: " + strand_energy + " kJ/mol";
    }
}

function get_complementary_dna() {

    const dna_bp = new Map();
    dna_bp.set("A", "T");
    dna_bp.set("T", "A");
    dna_bp.set("G", "C");
    dna_bp.set("C", "G");

    let dna_strand = document.getElementById('dna_strand_bp').value; // whatever data is in the text field
    if (dna_strand.match(/[^GCAT]/)) {
        document.getElementById("dna_bp_instructions").innerHTML = "Strand contains non-DNA nucleotides. Please re-enter DNA strand 5' to 3' using capital letters.";
        document.getElementById("dna_complementary_output").innerHTML = "Complementary DNA strand is: ";
    }
    else {
        let dna_strand_length = dna_strand.length;
        let complementary_dna = "";
        for (let i = 0; i < dna_strand_length; i++) {
            complementary_dna += dna_bp.get(dna_strand[i]);
        }
        document.getElementById("dna_complementary_output").innerHTML = "Complementary DNA Sequence: 3'- " + complementary_dna + " -5'";
    }

}

function get_coded_rna() {

    let dna_strand = document.getElementById('rna_strand').value; // whatever data is in the text field
    if (dna_strand.match(/[^GCAT]/)) {
        document.getElementById("rna_instructions").innerHTML = "Strand contains non-DNA nucleotides. Please re-enter coding DNA strand 5' to 3' using capital letters.";
        document.getElementById("rna_output").innerHTML = "Coded RNA strand is: ";
    }
    else {
        let rna_code = dna_strand.replaceAll("A", "U");
        document.getElementById("rna_output").innerHTML = "Coded RNA Sequence: 5'- " + rna_code + " -3'";
    }

}